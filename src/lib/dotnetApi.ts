import wretch from "wretch";

type Options = {
  dynamicSegment?: string;
  params?: { [key: string]: string };
};

type ApiArgs = {
  resource: string;
  options?: Options;
  body?: any;
};

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_DOTNET_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_DOTNET_API_URL;

if (typeof baseUrl === "undefined") {
  throw new Error("Could not retrieve base api url form env vars");
}

class HttpClient {
  public _client;
  private _baseUrl;
  private _routes;
  private _accessToken?: string;

  constructor(args: { routes: Map<string, string>; baseUrl: string }) {
    this._routes = args.routes;
    this._baseUrl = args.baseUrl;
    this._client = wretch(this._baseUrl)
      .errorType("json")
      .resolve((r) => r.json());
  }

  public setAuthorizationHeader(type: string, token: string) {
    const tokenString = type + " " + token;
    this._accessToken = tokenString;
  }

  private tryGetRoute(resource: string) {
    const entry = this._routes.get(resource);

    if (!entry) {
      throw new Error("Resource is not configured!");
    }

    return entry;
  }

  private tryParseParams(params?: { [key: string]: string }) {
    if (params) {
      return new URLSearchParams(params).toString();
    }

    return null;
  }

  private tryParseUrl(resource: string, options?: Options) {
    const route = this.tryGetRoute(resource);

    let dynamic = null;
    let params = null;

    if (options && Object.hasOwn(options, "dynamicSegment")) {
      dynamic = "/" + options.dynamicSegment;
    }

    if (options && Object.hasOwn(options, "params")) {
      params = "?" + this.tryParseParams(options.params);
    }

    return `${route}${dynamic ? dynamic : ""}${params ? params : ""}`;
  }

  public async getResource({ resource, options }: ApiArgs) {
    const urlString = this.tryParseUrl(resource, options);
    const res = await this._client
      .url(urlString)
      .auth(this._accessToken ?? "")
      .get();
    return res;
  }

  // FIXME: This and the function above it are now identical now that I have refactored to allow for more flexible route/query building.
  // The purpose of having different methods was because the parameters required the user to provide an id and a resource to get a specific resource.
  // SOLUTIONS:
  // could just delete
  // could keep both for the different naming
  public async getResources({ resource, options }: ApiArgs) {
    const urlString = this.tryParseUrl(resource, options);
    const res = await this._client
      .url(urlString)
      .auth(this._accessToken ?? "")
      .get();
    return res;
  }
  public async createResource({ resource, options, body }: ApiArgs) {
    const urlString = this.tryParseUrl(resource, options);
    const res = await this._client.url(urlString).post(body);
    return res;
  }

  public async updateResource({ resource, options, body }: ApiArgs) {
    const urlString = this.tryParseUrl(resource, options);
    const res = await this._client.url(urlString).patch(body);
    return res;
  }

  public async deleteResource({ resource, options, body }: ApiArgs) {
    const route = this.tryParseUrl(resource, options);
    const res = await fetch(`${this._baseUrl}${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this._accessToken ?? "",
      },
      body: JSON.stringify({ id: body }),
    });

    return res;
  }

  public async registerAccount(body: Record<string, string>) {
    const res = await fetch(`${this._baseUrl}/account/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (!res.ok) {
        throw Error("Failed to register");
      }
    });
  }

  public async loginAccount(body: Record<string, string>) {
    const res = await fetch(`${this._baseUrl}/account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      switch (res.status) {
        case 401:
          throw Error("Unauthorized");
        default:
          throw Error("Unknown error occurred");
      }
    }

    const data = await res.json();
    return data;
  }
}

export enum Resources {
  Subject = "subject",
  Deck = "deck",
  Card = "card",
  Answer = "answer",
  Tree = "tree",
  Generations = "generations",
  Submission = "submission",
  RegisterAccount = "register",
}

export const client = new HttpClient({
  routes: new Map([
    [Resources.Subject, "/api/subject"],
    [Resources.Deck, "/api/deck"],
    [Resources.Card, "/api/card"],
    [Resources.Answer, "/api/answer"],
    [Resources.Tree, "/api/tree"],
    [Resources.Generations, "/api/generations"],
    [Resources.Submission, "/api/submission"],
    [Resources.RegisterAccount, "/account/register"],
  ]),
  baseUrl: baseUrl,
});
