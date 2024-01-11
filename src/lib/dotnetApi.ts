import wretch from "wretch";

const env = "http://localhost:5034";

type Options = {
  dynamicSegment?: string;
  params?: { [key: string]: string };
};

type ApiArgs = {
  resource: string;
  options?: Options;
  body?: any;
};

class HttpClient {
  public _client;
  private _root;
  private _routes;

  constructor(args: { routes: Map<string, string>; root: string }) {
    this._routes = args.routes;
    this._root = args.root;
    this._client = wretch(this._root)
      .errorType("json")
      .resolve((r) => r.json());
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
    const res = await this._client.url(urlString).get();
    return res;
  }

  // FIXME: This and the function above it are now identical now that I have refactored to allow for more flexible route/query building.
  // The purpose of having different methods was because the parameters required the user to provide an id and a resource to get a specific resource.
  // SOLUTIONS:
  // could just delete
  // could keep both for the different naming
  public async getResources({ resource, options }: ApiArgs) {
    const urlString = this.tryParseUrl(resource, options);
    const res = await this._client.url(urlString).get();
    return res;
  }
  public async createResource({ resource, options, body }: ApiArgs) {
    const route = this.tryParseUrl(resource, options);
    const res = await this._client.url(route).post(body);
    return res;
  }

  public async updateResource({ resource, options, body }: ApiArgs) {
    const route = this.tryParseUrl(resource, options);
    const res = await this._client.url(route).patch(body);
    return res;
  }

  public async deleteResource({ resource, options, body }: ApiArgs) {
    const route = this.tryParseUrl(resource, options);
    const res = await fetch(`${env}${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: body }),
    });

    return res;
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
  ]),
  root: "http://localhost:5034",
});
