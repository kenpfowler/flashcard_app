/* tslint:disable */
/* eslint-disable */


/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * This file was automatically generated by pg-to-ts v.4.1.1
 * $ pg-to-ts generate -c postgres://username:password@localhost:5432/flashcard_db -t __EFMigrationsHistory -t Answers -t AspNetRoleClaims -t AspNetRoles -t AspNetUserClaims -t AspNetUserLogins -t AspNetUserRoles -t AspNetUsers -t AspNetUserTokens -t Cards -t Decks -t Responses -t Subjects -t Submissions -s public
 *
 */


export type Json = unknown;

// Table __EFMigrationsHistory
export interface EFMigrationsHistory {
  MigrationId: string;
  ProductVersion: string;
}
export interface EFMigrationsHistoryInput {
  MigrationId: string;
  ProductVersion: string;
}
const __EFMigrationsHistory = {
  tableName: '__EFMigrationsHistory',
  columns: ['MigrationId', 'ProductVersion'],
  requiredForInsert: ['MigrationId', 'ProductVersion'],
  primaryKey: 'MigrationId',
  foreignKeys: {},
  $type: null as unknown as EFMigrationsHistory,
  $input: null as unknown as EFMigrationsHistoryInput
} as const;

// Table Answers
export interface Answers {
  Id: string;
  AnswerText: string;
  CardId: string;
  IsCorrect: boolean;
}
export interface AnswersInput {
  Id: string;
  AnswerText: string;
  CardId: string;
  IsCorrect: boolean;
}
const Answers = {
  tableName: 'Answers',
  columns: ['Id', 'AnswerText', 'CardId', 'IsCorrect'],
  requiredForInsert: ['Id', 'AnswerText', 'CardId', 'IsCorrect'],
  primaryKey: 'Id',
  foreignKeys: { CardId: { table: 'Cards', column: 'Id', $type: null as unknown as Cards }, },
  $type: null as unknown as Answers,
  $input: null as unknown as AnswersInput
} as const;

// Table AspNetRoleClaims
export interface AspNetRoleClaims {
  Id: number;
  RoleId: string;
  ClaimType: string | null;
  ClaimValue: string | null;
}
export interface AspNetRoleClaimsInput {
  Id: number;
  RoleId: string;
  ClaimType?: string | null;
  ClaimValue?: string | null;
}
const AspNetRoleClaims = {
  tableName: 'AspNetRoleClaims',
  columns: ['Id', 'RoleId', 'ClaimType', 'ClaimValue'],
  requiredForInsert: ['Id', 'RoleId'],
  primaryKey: 'Id',
  foreignKeys: { RoleId: { table: 'AspNetRoles', column: 'Id', $type: null as unknown as AspNetRoles }, },
  $type: null as unknown as AspNetRoleClaims,
  $input: null as unknown as AspNetRoleClaimsInput
} as const;

// Table AspNetRoles
export interface AspNetRoles {
  Id: string;
  Name: string | null;
  NormalizedName: string | null;
  ConcurrencyStamp: string | null;
}
export interface AspNetRolesInput {
  Id: string;
  Name?: string | null;
  NormalizedName?: string | null;
  ConcurrencyStamp?: string | null;
}
const AspNetRoles = {
  tableName: 'AspNetRoles',
  columns: ['Id', 'Name', 'NormalizedName', 'ConcurrencyStamp'],
  requiredForInsert: ['Id'],
  primaryKey: 'Id',
  foreignKeys: {},
  $type: null as unknown as AspNetRoles,
  $input: null as unknown as AspNetRolesInput
} as const;

// Table AspNetUserClaims
export interface AspNetUserClaims {
  Id: number;
  UserId: string;
  ClaimType: string | null;
  ClaimValue: string | null;
}
export interface AspNetUserClaimsInput {
  Id: number;
  UserId: string;
  ClaimType?: string | null;
  ClaimValue?: string | null;
}
const AspNetUserClaims = {
  tableName: 'AspNetUserClaims',
  columns: ['Id', 'UserId', 'ClaimType', 'ClaimValue'],
  requiredForInsert: ['Id', 'UserId'],
  primaryKey: 'Id',
  foreignKeys: { UserId: { table: 'AspNetUsers', column: 'Id', $type: null as unknown as AspNetUsers }, },
  $type: null as unknown as AspNetUserClaims,
  $input: null as unknown as AspNetUserClaimsInput
} as const;

// Table AspNetUserLogins
export interface AspNetUserLogins {
  LoginProvider: string;
  ProviderKey: string;
  ProviderDisplayName: string | null;
  UserId: string;
}
export interface AspNetUserLoginsInput {
  LoginProvider: string;
  ProviderKey: string;
  ProviderDisplayName?: string | null;
  UserId: string;
}
const AspNetUserLogins = {
  tableName: 'AspNetUserLogins',
  columns: ['LoginProvider', 'ProviderKey', 'ProviderDisplayName', 'UserId'],
  requiredForInsert: ['LoginProvider', 'ProviderKey', 'UserId'],
  primaryKey: 'LoginProvider',
  foreignKeys: { UserId: { table: 'AspNetUsers', column: 'Id', $type: null as unknown as AspNetUsers }, },
  $type: null as unknown as AspNetUserLogins,
  $input: null as unknown as AspNetUserLoginsInput
} as const;

// Table AspNetUserRoles
export interface AspNetUserRoles {
  UserId: string;
  RoleId: string;
}
export interface AspNetUserRolesInput {
  UserId: string;
  RoleId: string;
}
const AspNetUserRoles = {
  tableName: 'AspNetUserRoles',
  columns: ['UserId', 'RoleId'],
  requiredForInsert: ['UserId', 'RoleId'],
  primaryKey: 'UserId',
  foreignKeys: {
    UserId: { table: 'AspNetUsers', column: 'Id', $type: null as unknown as AspNetUsers },
    RoleId: { table: 'AspNetRoles', column: 'Id', $type: null as unknown as AspNetRoles },
  },
  $type: null as unknown as AspNetUserRoles,
  $input: null as unknown as AspNetUserRolesInput
} as const;

// Table AspNetUsers
export interface AspNetUsers {
  Id: string;
  UserName: string | null;
  NormalizedUserName: string | null;
  Email: string | null;
  NormalizedEmail: string | null;
  EmailConfirmed: boolean;
  PasswordHash: string | null;
  SecurityStamp: string | null;
  ConcurrencyStamp: string | null;
  PhoneNumber: string | null;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  LockoutEnd: Date | null;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
}
export interface AspNetUsersInput {
  Id: string;
  UserName?: string | null;
  NormalizedUserName?: string | null;
  Email?: string | null;
  NormalizedEmail?: string | null;
  EmailConfirmed: boolean;
  PasswordHash?: string | null;
  SecurityStamp?: string | null;
  ConcurrencyStamp?: string | null;
  PhoneNumber?: string | null;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  LockoutEnd?: Date | null;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
}
const AspNetUsers = {
  tableName: 'AspNetUsers',
  columns: ['Id', 'UserName', 'NormalizedUserName', 'Email', 'NormalizedEmail', 'EmailConfirmed', 'PasswordHash', 'SecurityStamp', 'ConcurrencyStamp', 'PhoneNumber', 'PhoneNumberConfirmed', 'TwoFactorEnabled', 'LockoutEnd', 'LockoutEnabled', 'AccessFailedCount'],
  requiredForInsert: ['Id', 'EmailConfirmed', 'PhoneNumberConfirmed', 'TwoFactorEnabled', 'LockoutEnabled', 'AccessFailedCount'],
  primaryKey: 'Id',
  foreignKeys: {},
  $type: null as unknown as AspNetUsers,
  $input: null as unknown as AspNetUsersInput
} as const;

// Table AspNetUserTokens
export interface AspNetUserTokens {
  UserId: string;
  LoginProvider: string;
  Name: string;
  Value: string | null;
}
export interface AspNetUserTokensInput {
  UserId: string;
  LoginProvider: string;
  Name: string;
  Value?: string | null;
}
const AspNetUserTokens = {
  tableName: 'AspNetUserTokens',
  columns: ['UserId', 'LoginProvider', 'Name', 'Value'],
  requiredForInsert: ['UserId', 'LoginProvider', 'Name'],
  primaryKey: 'UserId',
  foreignKeys: { UserId: { table: 'AspNetUsers', column: 'Id', $type: null as unknown as AspNetUsers }, },
  $type: null as unknown as AspNetUserTokens,
  $input: null as unknown as AspNetUserTokensInput
} as const;

// Table Cards
export interface Cards {
  Id: string;
  DeckId: string;
  ImageUrl: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  Name: string;
}
export interface CardsInput {
  Id: string;
  DeckId: string;
  ImageUrl?: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  Name: string;
}
const Cards = {
  tableName: 'Cards',
  columns: ['Id', 'DeckId', 'ImageUrl', 'CreatedAt', 'UpdatedAt', 'Name'],
  requiredForInsert: ['Id', 'DeckId', 'CreatedAt', 'UpdatedAt', 'Name'],
  primaryKey: 'Id',
  foreignKeys: { DeckId: { table: 'Decks', column: 'Id', $type: null as unknown as Decks }, },
  $type: null as unknown as Cards,
  $input: null as unknown as CardsInput
} as const;

// Table Decks
export interface Decks {
  Id: string;
  Description: string | null;
  ImageUrl: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  SubjectId: string;
  Name: string;
}
export interface DecksInput {
  Id: string;
  Description?: string | null;
  ImageUrl?: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  SubjectId: string;
  Name: string;
}
const Decks = {
  tableName: 'Decks',
  columns: ['Id', 'Description', 'ImageUrl', 'CreatedAt', 'UpdatedAt', 'SubjectId', 'Name'],
  requiredForInsert: ['Id', 'CreatedAt', 'UpdatedAt', 'SubjectId', 'Name'],
  primaryKey: 'Id',
  foreignKeys: { SubjectId: { table: 'Subjects', column: 'Id', $type: null as unknown as Subjects }, },
  $type: null as unknown as Decks,
  $input: null as unknown as DecksInput
} as const;

// Table Responses
export interface Responses {
  Id: string;
  SubmissionId: string;
  CardId: string;
  AnswerId: string;
  CorrectAnswerId: string;
}
export interface ResponsesInput {
  Id: string;
  SubmissionId: string;
  CardId: string;
  AnswerId: string;
  CorrectAnswerId: string;
}
const Responses = {
  tableName: 'Responses',
  columns: ['Id', 'SubmissionId', 'CardId', 'AnswerId', 'CorrectAnswerId'],
  requiredForInsert: ['Id', 'SubmissionId', 'CardId', 'AnswerId', 'CorrectAnswerId'],
  primaryKey: 'Id',
  foreignKeys: {
    SubmissionId: { table: 'Submissions', column: 'Id', $type: null as unknown as Submissions },
    CardId: { table: 'Cards', column: 'Id', $type: null as unknown as Cards },
  },
  $type: null as unknown as Responses,
  $input: null as unknown as ResponsesInput
} as const;

// Table Subjects
export interface Subjects {
  Id: string;
  Description: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  ImageUrl: string | null;
  Name: string;
}
export interface SubjectsInput {
  Id: string;
  Description?: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  ImageUrl?: string | null;
  Name: string;
}
const Subjects = {
  tableName: 'Subjects',
  columns: ['Id', 'Description', 'CreatedAt', 'UpdatedAt', 'ImageUrl', 'Name'],
  requiredForInsert: ['Id', 'CreatedAt', 'UpdatedAt', 'Name'],
  primaryKey: 'Id',
  foreignKeys: {},
  $type: null as unknown as Subjects,
  $input: null as unknown as SubjectsInput
} as const;

// Table Submissions
export interface Submissions {
  Id: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeckId: string;
  UserId: string | null;
}
export interface SubmissionsInput {
  Id: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeckId: string;
  UserId?: string | null;
}
const Submissions = {
  tableName: 'Submissions',
  columns: ['Id', 'CreatedAt', 'UpdatedAt', 'DeckId', 'UserId'],
  requiredForInsert: ['Id', 'CreatedAt', 'UpdatedAt', 'DeckId'],
  primaryKey: 'Id',
  foreignKeys: { DeckId: { table: 'Decks', column: 'Id', $type: null as unknown as Decks }, },
  $type: null as unknown as Submissions,
  $input: null as unknown as SubmissionsInput
} as const;


export interface TableTypes {
  __EFMigrationsHistory: {
    select: EFMigrationsHistory;
    input: EFMigrationsHistoryInput;
  };
  Answers: {
    select: Answers;
    input: AnswersInput;
  };
  AspNetRoleClaims: {
    select: AspNetRoleClaims;
    input: AspNetRoleClaimsInput;
  };
  AspNetRoles: {
    select: AspNetRoles;
    input: AspNetRolesInput;
  };
  AspNetUserClaims: {
    select: AspNetUserClaims;
    input: AspNetUserClaimsInput;
  };
  AspNetUserLogins: {
    select: AspNetUserLogins;
    input: AspNetUserLoginsInput;
  };
  AspNetUserRoles: {
    select: AspNetUserRoles;
    input: AspNetUserRolesInput;
  };
  AspNetUsers: {
    select: AspNetUsers;
    input: AspNetUsersInput;
  };
  AspNetUserTokens: {
    select: AspNetUserTokens;
    input: AspNetUserTokensInput;
  };
  Cards: {
    select: Cards;
    input: CardsInput;
  };
  Decks: {
    select: Decks;
    input: DecksInput;
  };
  Responses: {
    select: Responses;
    input: ResponsesInput;
  };
  Subjects: {
    select: Subjects;
    input: SubjectsInput;
  };
  Submissions: {
    select: Submissions;
    input: SubmissionsInput;
  };
}

export const tables = {
  __EFMigrationsHistory,
  Answers,
  AspNetRoleClaims,
  AspNetRoles,
  AspNetUserClaims,
  AspNetUserLogins,
  AspNetUserRoles,
  AspNetUsers,
  AspNetUserTokens,
  Cards,
  Decks,
  Responses,
  Subjects,
  Submissions,
}
