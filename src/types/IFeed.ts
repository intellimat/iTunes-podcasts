export interface IFeed {
  author: Author;
  entry: Entry[];
  updated: Icon;
  rights: Icon;
  title: Icon;
  icon: Icon;
  link: Link[];
  id: Icon;
}

interface Author {
  name: Icon;
  uri: Icon;
}

interface Icon {
  label: string;
}

interface Entry {
  "im:name": Icon;
  "im:image": IMImage[];
  summary: Icon;
  "im:price": IMPrice;
  "im:contentType": IMContentType;
  rights?: Icon;
  title: Icon;
  link: Link;
  id: ID;
  "im:artist": IMArtist;
  category: Category;
  "im:releaseDate": IMReleaseDate;
}

export interface Category {
  attributes: CategoryAttributes;
}

interface CategoryAttributes {
  "im:id": string;
  term: string;
  scheme: string;
  label: string;
}

interface ID {
  label: string;
  attributes: IDAttributes;
}

interface IDAttributes {
  "im:id": string;
}

interface IMArtist {
  label: string;
  attributes?: IMArtistAttributes;
}

interface IMArtistAttributes {
  href: string;
}

interface IMContentType {
  attributes: IMContentTypeAttributes;
}

interface IMContentTypeAttributes {
  term: TermEnum;
  label: TermEnum;
}

enum TermEnum {
  Podcast = "Podcast",
}

interface IMImage {
  label: string;
  attributes: IMImageAttributes;
}

interface IMImageAttributes {
  height: string;
}

interface IMPrice {
  label: IMPriceLabel;
  attributes: IMPriceAttributes;
}

interface IMPriceAttributes {
  amount: string;
  currency: Currency;
}

enum Currency {
  Usd = "USD",
}

enum IMPriceLabel {
  Get = "Get",
}

interface IMReleaseDate {
  label: Date;
  attributes: Icon;
}

interface Link {
  attributes: LinkAttributes;
}

interface LinkAttributes {
  rel: Rel;
  type?: Type;
  href: string;
}

enum Rel {
  Alternate = "alternate",
  Self = "self",
}

enum Type {
  TextHTML = "text/html",
}
