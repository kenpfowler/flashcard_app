### GOALS

#### Epic 1 - Implement crud operations for application data

- [x] Implement crud for subjects

  - [x] User can create a subject
  - [x] User can read a subject
  - [x] User can update a subject
  - [x] User can delete a subject

- [x] Implement crud for decks
  - [x] User can create a deck
  - [x] User can read a a deck
  - [x] User can update a deck
  - [x] User can delete a deck
- [x] Implement crud for cards

  - [x] User can create cards
  - [x] User can read cards
  - [x] User can update cards
  - [x] user can delete cards

- [x] Implement crud for answers
  - [x] User can create answers
  - [x] User can read answers
  - [x] User can update answers
  - [x] user can delete answers

#### Feature Review

- It makes more sense to edit the elements of a flashcard in context (ex: you can see the question, potential answers, which answer is correct in one place) rather than have an
  interface for editing these separately
- Currently, we create flashcards by generating them with the ChatGPT, but I think that we should also have an interface for creating them manually.
- The manual card creation interface should be the same as the editor - A single form that allows input of the question, answers, marks the correct answer.

#### Epic 2 - Implement GUI for managing subjects, decks, and cards.

- [x] Select library for managing a file structure in react.
- [x] Implement top level controls for tree view
  - [x] user can create a subject.
- [x] Create context menu component that integrates with treeview
- [x] Implement context menu actions for tree view item to be shown on right click
      --> on subjects

  - [x] user can create a deck
  - [x] user can edit the subject
  - [x] user can delete the subject

  --> on decks

  - [x] user can create a card from scratch
  - [x] user can generate cards
  - [x] user can study the deck
  - [x] user can edit the deck
  - [x] user can delete the deck

  --> on cards

  - [x] user can edit the card
  - [x] user can delete the card

- [ ] Implement drag and drop actions
  - [ ] user should be able to organize a deck under another subject
  - [ ] user should be able to organize a card under a new deck
  - [ ] user should be able to reorder items (maybe?)

#### Feature Review

#### Epic 3 - Implement Quiz presentation

- [ ] Implement quiz presentation
  - [ ] User Should be able to select a deck and be presented with a test
  - [ ] User can select an answer for each question
  - [ ] User can submit quiz
- [ ] Implement quiz feedback
  - [ ] User should see a list of all the questions they answered and have at-a-glance information about how they scored and which questions they got/missed
  - [ ] User should see a how they answered each card and if they were incorrect, what the correct answer was.

#### Epic 4 - Implement analytics page

#### Epic 5 - Implement user accounts and authentication

#### Epic 6 - Implement landing page

#### Epic 7 - Implement testing

#### Epic 8 - Implement monetization

#### Epic 9 - Implement System for surfacing popular or useful decks made by other users

#### Epic X - Quality of life - Developer experience - CI/CD

- [ ] Configure project to operate locally and in a production environment
- [ ] Determine the minimum amount of testing needed to make the project reliable
- [ ]

#### Side Project - CLI Tool for generating routes for nextjs projects

- [ ] Since there are many different ORM's available lets just try to support prisma first
- [ ] Simple requests for data and tables should be made given a data model
- [ ] Route handlers should integrate with data models (much like the code first approach with entity framework)
- [ ] User should be able to configure if other reserved pages should be automatically created ex: layout.tsx, loading.tsx, and etc.
- [ ] User should be able to pass flags to modify the genereate command (EX: opt in to generating route handlers)
