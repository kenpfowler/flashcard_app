import wretch from "wretch";

type Options = {
  dynamicSegment?: string;
  params?: { [key: string]: string };
  auth?: string;
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

  constructor(args: { routes: Map<string, string>; baseUrl: string }) {
    this._routes = args.routes;
    this._baseUrl = args.baseUrl;
    this._client = wretch(this._baseUrl)
      .errorType("json")
      .resolve((r) => r.json());
  }

  public getAuthorizationHeaderValue(tokenType: string, accessToken: string) {
    const tokenString = tokenType + " " + accessToken;
    return tokenString;
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
      .auth(options?.auth ?? "")
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
      .auth(options?.auth ?? "")
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
        Authorization: options?.auth ?? "",
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
    });

    this.handleError(res);
  }

  public async refreshAccessToken(body: Record<string, string>) {
    const res = await fetch(`${this._baseUrl}/account/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    this.handleError(res);

    const data = await res.json();
    return data;
  }

  private handleError(res: Response) {
    if (res.ok) {
      return;
    }

    switch (res.status) {
      case 401:
        throw new Error("Unauthorized");
      default:
        throw new Error("Unknown error occurred");
    }
  }

  public async loginUser(body: Record<string, string>) {
    const res = await fetch(`${this._baseUrl}/account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    this.handleError(res);

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
