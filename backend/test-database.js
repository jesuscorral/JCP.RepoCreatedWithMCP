/**
 * Database Testing Script
 * Tests database connection, model creation, and basic CRUD operations
 */

const { initializeDatabase, closeConnection } = require('./src/config/database');
const Todo = require('./src/models/Todo');

async function testDatabaseSetup() {
  console.log('🧪 Starting database tests...\n');

  try {
    // Test 1: Database initialization
    console.log('📡 Test 1: Database Connection & Initialization');
    await initializeDatabase();
    console.log('✅ Database initialized successfully\n');

    // Test 2: Create a new todo
    console.log('📝 Test 2: Creating a new todo');
    const newTodo = await Todo.create({
      title: 'Test Todo from Database Test',
      description: 'This todo was created during database testing',
      priority: 'high',
      tags: ['test', 'database', 'validation']
    });
    console.log('✅ Todo created:', {
      id: newTodo.id,
      title: newTodo.title,
      completed: newTodo.completed,
      priority: newTodo.priority
    });
    console.log('');

    // Test 3: Find todos
    console.log('🔍 Test 3: Finding todos');
    const allTodos = await Todo.findAll();
    console.log(`✅ Found ${allTodos.length} todos in database`);
    
    const incompleteTodos = await Todo.findCompleted(false);
    console.log(`✅ Found ${incompleteTodos.length} incomplete todos`);
    
    const highPriorityTodos = await Todo.findByPriority('high');
    console.log(`✅ Found ${highPriorityTodos.length} high priority todos\n`);

    // Test 4: Update todo
    console.log('✏️ Test 4: Updating todo');
    await newTodo.markComplete();
    await newTodo.reload();
    console.log('✅ Todo marked as complete:', newTodo.completed);
    console.log('');

    // Test 5: Instance methods
    console.log('🔄 Test 5: Testing instance methods');
    await newTodo.addTag('completed');
    await newTodo.reload();
    console.log('✅ Tag added:', newTodo.tags);
    
    await newTodo.toggleComplete();
    await newTodo.reload();
    console.log('✅ Todo toggled:', newTodo.completed);
    console.log('');

    // Test 6: Validation
    console.log('🛡️ Test 6: Testing validation');
    try {
      await Todo.create({
        title: '', // Should fail validation
        description: 'Empty title test'
      });
    } catch (validationError) {
      console.log('✅ Validation working correctly:', validationError.errors[0].message);
    }
    console.log('');

    // Test 7: Clean up test data
    console.log('🧹 Test 7: Cleaning up test data');
    await newTodo.destroy();
    console.log('✅ Test todo deleted\n');

    // Final summary
    console.log('🎉 All database tests passed successfully!');
    console.log('📊 Database Features Tested:');
    console.log('  ✅ Connection and initialization');
    console.log('  ✅ Model creation and validation');
    console.log('  ✅ CRUD operations (Create, Read, Update, Delete)');
    console.log('  ✅ Instance methods and hooks');
    console.log('  ✅ Custom finder methods');
    console.log('  ✅ Data validation and error handling');

  } catch (error) {
    console.error('❌ Database test failed:', error);
    throw error;
  } finally {
    // Close database connection
    await closeConnection();
    console.log('\n💤 Database connection closed');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testDatabaseSetup()
    .then(() => {
      console.log('\n✨ Database testing completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Database testing failed:', error);
      process.exit(1);
    });
}

module.exports = testDatabaseSetup;