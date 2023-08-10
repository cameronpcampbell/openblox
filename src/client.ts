import { ThumbnailsApiClass } from "./apis/thumbnailsApi"
import { UsersApiClass } from "./apis/usersApi"

type ClientConfigType = { cookie: string }

export class OpenbloxClient {
  apis: {
    UsersApi: UsersApiClass,
    ThumbnailsApi: ThumbnailsApiClass
  }

  constructor(config?: ClientConfigType) {
    const cookie = config?.cookie
    this.apis = {
      UsersApi: new UsersApiClass(cookie),
      ThumbnailsApi: new ThumbnailsApiClass(cookie)
    }
  }
}