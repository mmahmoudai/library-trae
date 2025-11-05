const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('../config/db');
const User = require('../models/User');
const Book = require('../models/Book');

async function run() {
  try {
    await connectDB();

    // Seed a default user matching your provided credentials
    const email = 'root@library.local';
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      await User.create({ name: 'Root', email, password: 'rootroot' });
      console.log('Seeded default user:', email, '/ password: rootroot');
    } else {
      console.log('User already exists:', email);
    }

        // Seed a few books
    const books = [
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        description: 'A handbook of agile software craftsmanship.',
        coverImage: 'https://picsum.photos/seed/cleancode/300/400'
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt, David Thomas',
        description: 'Journey to mastery for pragmatic developers.',
        coverImage: 'https://picsum.photos/seed/pragmatic/300/400'
      },
      {
        title: 'You Do Not Know JS Yet',
        author: 'Kyle Simpson',
        description: 'Deep dive into the JavaScript language.',
        coverImage: 'https://picsum.photos/seed/ydkjs/300/400'
      },
      {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        description: 'A modern introduction to programming with JavaScript.',
        coverImage: 'https://picsum.photos/seed/eloquent/300/400'
      },
      {
        title: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        description: 'Unearthing the excellence in JavaScript.',
        coverImage: 'https://picsum.photos/seed/jsgood/300/400'
      },
      {
        title: 'Refactoring',
        author: 'Martin Fowler',
        description: 'Improving the design of existing code.',
        coverImage: 'https://picsum.photos/seed/refactor/300/400'
      },
      {
        title: 'Design Patterns',
        author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
        description: 'Elements of reusable object-oriented software.',
        coverImage: 'https://picsum.photos/seed/designpat/300/400'
      },
      {
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
        description: 'Comprehensive guide to algorithms and data structures.',
        coverImage: 'https://picsum.photos/seed/algorithms/300/400'
      },
      {
        title: 'Cracking the Coding Interview',
        author: 'Gayle Laakmann McDowell',
        description: 'Programming questions and solutions for technical interviews.',
        coverImage: 'https://picsum.photos/seed/ctci/300/400'
      },
      {
        title: 'Code Complete',
        author: 'Steve McConnell',
        description: 'A practical handbook of software construction.',
        coverImage: 'https://picsum.photos/seed/codecomp/300/400'
      },
      {
        title: 'The Mythical Man-Month',
        author: 'Frederick P. Brooks Jr.',
        description: 'Essays on software engineering and project management.',
        coverImage: 'https://picsum.photos/seed/mythical/300/400'
      },
      {
        title: 'Working Effectively with Legacy Code',
        author: 'Michael Feathers',
        description: 'Strategies for working with large, untested code bases.',
        coverImage: 'https://picsum.photos/seed/legacy/300/400'
      },
      {
        title: 'Deep Work',
        author: 'Cal Newport',
        description: 'Rules for focused success in a distracted world.',
        coverImage: 'https://picsum.photos/seed/deepwork/300/400'
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        description: 'Tiny changes, remarkable results: an easy and proven way to build good habits.',
        coverImage: 'https://picsum.photos/seed/atomic/300/400'
      },
      {
        title: 'The Clean Coder',
        author: 'Robert C. Martin',
        description: 'A code of conduct for professional programmers.',
        coverImage: 'https://picsum.photos/seed/cleancoder/300/400'
      }
    ];

    for (const b of books) {
      const exists = await Book.findOne({ title: b.title });
      if (!exists) {
        await Book.create(b);
        console.log('Inserted book:', b.title);
      } else {
        console.log('Book exists:', b.title);
      }
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

run();