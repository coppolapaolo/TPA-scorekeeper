# 🧪 TPA Scorekeeper - Testing Suite

Comprehensive unit testing system for the TPA Scorekeeper application.

## 📁 Test Structure

```
test/
├── test-runner.html         ← Browser-based test runner
├── test-framework.js        ← Simple testing framework
├── test-utils.js           ← Tests for utility functions
├── test-models.js          ← Tests for data models
├── test-warning-badges.js  ← Tests for warning badges system
└── README.md               ← This file
```

## 🚀 Running Tests

### Method 1: Browser Test Runner (Recommended)
1. Open `test/test-runner.html` in your browser
2. Click "🚀 Run All Tests" button
3. View results in the console output

### Method 2: Direct Console Access
1. Open browser developer tools (F12)
2. Navigate to the test runner page
3. Use `runTests()` function in console

### Method 3: Auto-run on Load
1. Open: `test/test-runner.html?autorun=true`
2. Tests will run automatically after page load

## 📋 Test Coverage

### ✅ Utility Functions (`test-utils.js`)
- **Date formatting**: `formatDateTime()` accuracy
- **TPA calculation**: Score computation logic
- **Error counting**: `totalErrors()` summation
- **Score display**: String generation for UI
- **Kick sequences**: HTML generation for kicks

### ✅ Data Models (`test-models.js`)
- **TPAAnnotation**: Initialization, reset, note generation
- **Turn**: Break detection, winning logic, played status
- **Match**: Player management, score tracking, turn flow
- **Player Toggle**: Bug fix verification for player switching

### ✅ Warning Badges (`test-warning-badges.js`)
- **Badge Display**: 1 error (⚠️), 2 errors (⚠️⚠️)
- **Badge Clearing**: Reset on 0 errors
- **DOM Safety**: Graceful handling of missing elements
- **Multi-player**: Separate badge management per player

## 🔍 Test Framework Features

### Simple Assertions
```javascript
assert.equal(actual, expected);
assert.ok(value);
assert.deepEqual(obj1, obj2);
assert.throws(function);
```

### Test Structure
```javascript
describe('Test Suite Name', () => {
    it('should do something specific', () => {
        // Test code here
        assert.equal(result, expected);
    });
});
```

### Async Support
```javascript
it('should handle async operations', async () => {
    const result = await someAsyncFunction();
    assert.ok(result);
});
```

## 🐛 Debugging Tests

### Console Output
- ✅ Green checkmarks for passing tests
- ❌ Red X marks for failing tests
- 💥 Error details for debugging

### Common Issues
1. **DOM not available**: Some tests require mock DOM elements
2. **Module dependencies**: Ensure all JS files load in correct order
3. **Async timing**: Use proper async/await for timing-dependent tests

## 📊 Test Results Interpretation

### Success Indicators
- All tests show ✅ green checkmarks
- Final summary shows 100% success rate
- Console shows "🎉 All tests passed!"

### Failure Indicators
- Any ❌ red X marks in output
- Error messages with specific failure details
- Success rate below 100%

## 🔧 Adding New Tests

### 1. Create Test File
```javascript
// test-new-feature.js
describe('New Feature', () => {
    it('should work correctly', () => {
        // Test implementation
        assert.equal(newFeature(), expectedResult);
    });
});
```

### 2. Update Test Runner
Add script tag to `test-runner.html`:
```html
<script src="test-new-feature.js"></script>
```

### 3. Test Categories
- **Unit Tests**: Individual function testing
- **Integration Tests**: Component interaction testing
- **UI Tests**: DOM manipulation and display testing
- **Logic Tests**: Game flow and rule enforcement

## 📈 Best Practices

### Test Writing
1. **One assertion per test** when possible
2. **Clear test descriptions** using "should" statements
3. **Setup/teardown** using beforeEach patterns
4. **Mock external dependencies** for isolation

### Test Organization
1. **Group related tests** in describe blocks
2. **Use descriptive names** for test suites
3. **Test edge cases** and error conditions
4. **Maintain test independence** (no shared state)

## 🔄 Continuous Testing

### Development Workflow
1. Write failing test first (TDD approach)
2. Implement feature to make test pass
3. Refactor while keeping tests green
4. Add new tests for edge cases

### Before Commits
1. Run full test suite
2. Ensure 100% pass rate
3. Add tests for new features
4. Update documentation if needed

## 📝 Notes

- Tests use a custom lightweight framework (no external dependencies)
- Some tests use mock DOM elements and may not reflect full browser behavior
- For complete integration testing, manual testing in the actual application is recommended
- Browser compatibility: Modern browsers with ES6+ support required