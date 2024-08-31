const { UserList, MovieList } = require("../FakeData")
const _ = require("lodash")

const resolvers = {
    Query: {
        users() {
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        },

        // Movie resolvers
        movies:() => {
           return MovieList
        },
        movie:(parent, args) => {
            const name = args.name;
            const movie = _.find(MovieList, {name});
            return movie;
        }
    },
    User: {
        favoriteMovies:() => {
            return _.filter(MovieList, (movie) => {
                return movie.yearOfPublication > 2000 && movie.yearOfPublication < 2010
            })
        }
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id
            user.id = lastId + 1;
            UserList.push(user)
            return user;
        },
        updateUserName: (parent, args) => {
            const {newUsername, id} = args.input;
            let updatedUser;
            UserList.forEach((user) => {
                if(user.id === Number(id)) {
                    user.username = newUsername
                    updatedUser = user
                }
            })
            return updatedUser;
        },
        deleteUser: (parent, args) => {
            const {id} = args;
            _.remove(UserList, (user) => user.id === Number(id));
            return null;
        }
    }
}

module.exports = { resolvers }