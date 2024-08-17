import type { Identifier, ISODateTime, ObjectPrettify, Url } from "typeforge"


type JobType = "FullTime" | "PartTime" | "Commission"

type SkillType = "Graphics Design" | "Clothes Design" | "Development" | "Animation" | "UI Design" | "Sound Production" | "Composing" | "Modeling" | "Level Design" | "Community" | "Business Development" | "Game Design" | "Programmer" | "Scripting" | "Social Media" | "User Experience" | "Git" | "Data Analysis" | "Management" | "Leadership" | "QA" | "Map Design" | "Building" | "Marketing" | "Texturing" | "Translation" | "Particles" | "Education" | "Voice Actor" | "UGC" | "Pants" | "Avatar Items" | "Shirts" | "Layered Clothing" | "Hats" | "Concert" | "Brands" | "Turnkey Experiences" | "Integrations" | "Sports" | "Simulation" | "Adventure" | "Simulator" | "Idle" | "Puzzle" | "Platformer" | "Social Hangout" | "Tabletop Games" | "Action" | "Minigames" | "Role-playing" | "Tycoon" | "Shopping" | "Strategy" | "Sandbox" | "Media Creation" | "Charity" | "Fashion" | "Beauty" | "Entertainment" | "Live Ops" | "Project Management" | "Influencer Marketing" | "English" | "Spanish" | "German" | "French" | "Italian" | "Brazilian Portuguese" | "Simplified Chinese" | "Traditional Chinese" | "Korean" | "Japanese" | "Indonesian" | "Vietnamese" | "Thai" | "Turkish" | "Arabic" | "Polish"


// GET /v1/users/{userId}/games --------------------------------------------------------------------------------------
export type RawUsersAreIdVerifiedData<UserId extends Identifier> = ObjectPrettify<{
  data: {
    userId: UserId,
    isVerified: boolean
  }[]
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/users/{userId}/games --------------------------------------------------------------------------------------
type CreatorProfileData<UserId extends Identifier, TimeType> = ObjectPrettify<{
  creatorUserId: UserId,
  createdUtc: TimeType,
  updatedUtc: TimeType,
  isPublic: boolean,
  isContactAllowed: boolean,
  creatorDescription: string,
  isOpenToWork: boolean,
  interestDescription: string,
  linkTypes: ("Roblox" | "DeveloperForum" | "Facebook" | "Twitter" | "Youtube" | "Twitch")[],
  preferredContactLinkType: "DeveloperForum" | "Roblox" | "Invalid",
  socialLinks: [],
  jobTypes: JobType[],
  skillTypes: SkillType[],
  requiresAction: "NoAction"
}>

export type RawCreatorProfileData<UserId extends Identifier> = ObjectPrettify<{
  data: [ CreatorProfileData<UserId, ISODateTime> ]
}>

export type PrettifiedCreatorProfileData<UserId extends Identifier> = CreatorProfileData<UserId, Date>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/users/{userId}/experiences --------------------------------------------------------------------------------
type CreatorExperienceData<TimeType> = ObjectPrettify<{
  experienceId: Identifier,
  creatorUserId: Identifier,
  createdUtc: TimeType,
  updatedUtc: TimeType,
  projectName: string,
  experienceDescription: string,
  jobRole: string,
  teamName: string,
  experienceMedia: {
    assetId: Identifier,
    title: `RobloxScreenShot${number}_${number}.${string}`
  }[],
  experienceLinks: `[${string}](${Url})`[],
  teamId: Identifier | null,
  robloxExperienceIds: Identifier[],
  robloxAssetIds: Identifier[],
  startedUtc: TimeType,
} & (
  {
    endedUtc: TimeType,
    isCurrent: false
  } | {
    endedUtc: null,
    isCurrent: true
  }
)>

export type RawCreatorExperiencesData = ObjectPrettify<{
  data: CreatorExperienceData<ISODateTime>[]
}>

export type PrettifiedCreatorExperiencesData = CreatorExperienceData<Date>[]
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/jobs/search -----------------------------------------------------------------------------------------------
type PaymentType = "Robux" | "RevenuePercent" | "Currency"

export type JobSearchFilter = {
  jobType?: JobType[],
  paymentAmount?: {
    from?: number,
    to?: number,
  },
  paymentTypes?: PaymentType[],
  skillTypes?: SkillType[],
  isVerified?: boolean,

}

type JobSearchResult<TimeType, BoolType> = ObjectPrettify<{
  id: Identifier,
  jobPosterId: Identifier,
  title: string,
  description: string,
  jobType: JobType,
  paymentTypes: PaymentType[],
  skillTypes: SkillType,
  publishedUtc: TimeType,
  expiresUtc: TimeType,
  minAgeRequirement: number,
  isVerifiedRequirement: BoolType,
  paymentAmount: number,
  paymentAmountType: "Total" | string,
  _meta: {
    score: number
  }
}>

type JobSearchData<JobSearchType> = ObjectPrettify<{
  meta: {
    page: {
      totalPages: number,
      totalResults: number,
      current: number,
      size: number
    }
  },
  results: JobSearchType[]
}>


type RawJobSearchResult = JobSearchResult<ISODateTime, "true" | "false">
export type RawJobSearchData = JobSearchData<ObjectPrettify<{
  [Key in keyof RawJobSearchResult]: Key extends "_meta" ? RawJobSearchResult[Key] : {
    raw: RawJobSearchResult[Key]
  }
}>>

export type PrettifiedJobSearchData = JobSearchData<JobSearchResult<Date, boolean>>
// -------------------------------------------------------------------------------------------------------------------



