module.exports = {
    posts: [
        { id: 1, username: "Bob", email: "bob@bob.com" },
        { id: 2, username: "Alice", email: "alice@alice.com" },
    ],
    users: [
        { id: 123, name: "John Doe" },
        { id: 456, name: "Jane Doe" }
    ],
    comments: [ 
        { id: 987, post_id: 1, body: "Consectetur adipiscing elit", date: new Date('2017-07-03') },
        { id: 995, post_id: 1, body: "Nam molestie pellentesque dui", date: new Date('2017-08-17') }
    ]
}