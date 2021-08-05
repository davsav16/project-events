const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    firstName: String
    lastName: String
    age: Int
    friendsCount: Int
    meetings: [Meeting]
    friends: [User]
  }

  type Category {
    _id: ID
    name: String
  }

  type Meeting {
    _id: ID
    meetingTime: String
    username: String
    place: String
    meetingType: String
    createdAt: String
    reactionsCount: Int
    reactions: [Reactions]
  }

  type Reactions {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    me: User
    users: [User]
    meetings(username: String!): [Meeting]
    singleMeeting(_id: ID!): Meeting
    allMeetings: [Meeting]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      age: Int!
    ): Auth

    addReaction(meetingId: ID!, reactionBody: String!): Meeting

    addMeeting(
      meetingTime: Int!
      place: String!
      meetingType: String!
    ): Meeting

    addFriend(friendId: ID!): User

    updateUser(
      username: String
      firstName: String
      lastName: String
      email: String
      password: String
      age: Int
    ): User

    updateMeeting(
      meetingTime: String
      place: String
      meetingType: String
    ): Meeting

    deleteMeeting(meetingId: String): Meeting

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
