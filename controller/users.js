let users = [
    {
        "id": 1,
        "name": "Ayesha Anjum",
        "email": "moon@moaz.com",
        "age": 22
    },
    {
        "id": 2,
        "name": "Maliha Anjum",
        "email": "maisha@moaz.com",
        "age": 11
    },
    {
        "id": 3,
        "name": "Moaz mahmud",
        "email": "moaz@moaz.com",
        "age": 26
    }
]

const fileds = new Set(['name', 'email', 'age'])

export const getUsers = (req, res) => {
    res.status(200).json(users)
}

export const getUser = (req, res) => {
    const id = req.params.id
    const user = getUserById(id)
    if (!user) return res.status(404).send('No user found')
    res.send(user)
}

export const addUser = (req, res) => {
    let user = req.body
    user = extractUser(user)

    if (!isValidUser(user)) return res.status(400).send('Wrong input')

    const id = users.length + 1
    user = { id, ...user }
    users.push(user)
    res.send(user)
}

export const updateUser = (req, res) => {
    const id = req.params.id
    const newUser = req.body
    let modiedUser
    for (let user of users) {
        if (user.id == id) {
            patchUser(user, newUser)
            modiedUser = user
            return res.send(user)
        }
    }
    res.status(400).send(modiedUser)
}

export const deleteUser = (req, res) => {
    const id = req.params.id
    const user = getUserById(id)

    if (!user) return res.status(404).send('No user found')

    users = users.filter(user => user.id != id)
    res.send(user)
}

const patchUser = (user, newUser) => {
    for (const field in newUser)
        if (fileds.has(field))
            user[field] = newUser[field]
}

const getUserById = (id) => {
    return users.find(user => user.id == id)
}

const extractUser = (userInput) => {
    const user = {}
    for (const field in userInput) {
        if (fileds.has(field))
            user[field] = userInput[field]
    }
    return user
}

const isValidUser = (user) => {
    for (const field of fileds)
        if (!(field in user) || !user[field])
            return false
    return true
}