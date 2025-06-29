// ===== SIMPLE TEST FRAMEWORK =====

/**
 * Test result tracking
 */
const TestResults = {
    passed: 0,
    failed: 0,
    total: 0,
    
    reset: function() {
        this.passed = 0;
        this.failed = 0;
        this.total = 0;
    },
    
    addResult: function(passed) {
        this.total++;
        if (passed) {
            this.passed++;
        } else {
            this.failed++;
        }
    },
    
    summary: function() {
        const percentage = this.total > 0 ? ((this.passed / this.total) * 100).toFixed(1) : 0;
        console.log('\n📊 Test Results:');
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📝 Total:  ${this.total}`);
        console.log(`📈 Success Rate: ${percentage}%`);
        
        if (this.failed === 0) {
            console.log('\n🎉 All tests passed!');
        } else {
            console.log(`\n⚠️  ${this.failed} test(s) failed`);
        }
    }
};

/**
 * Assertion functions
 */
const assert = {
    /**
     * Assert that a condition is true
     * @param {boolean} condition - Condition to test
     * @param {string} message - Test description
     * @returns {boolean} Test result
     */
    ok: function(condition, message) {
        const passed = Boolean(condition);
        TestResults.addResult(passed);
        
        if (passed) {
            console.log(`✅ ${message}`);
        } else {
            console.log(`❌ ${message}`);
            console.log(`   💥 Expected truthy value, got: ${condition}`);
        }
        
        return passed;
    },

    /**
     * Assert that two values are equal
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     * @param {string} message - Test description
     * @returns {boolean} Test result
     */
    equal: function(actual, expected, message) {
        const passed = actual === expected;
        TestResults.addResult(passed);
        
        if (passed) {
            console.log(`✅ ${message}`);
        } else {
            console.log(`❌ ${message}`);
            console.log(`   💥 Expected: ${expected}, got: ${actual}`);
        }
        
        return passed;
    },

    /**
     * Assert that a value is null or undefined
     * @param {*} value - Value to test
     * @param {string} message - Test description
     * @returns {boolean} Test result
     */
    isNull: function(value, message) {
        const passed = value === null || value === undefined;
        TestResults.addResult(passed);
        
        if (passed) {
            console.log(`✅ ${message}`);
        } else {
            console.log(`❌ ${message}`);
            console.log(`   💥 Expected null/undefined, got: ${value}`);
        }
        
        return passed;
    },

    /**
     * Assert that a value is not null or undefined
     * @param {*} value - Value to test
     * @param {string} message - Test description
     * @returns {boolean} Test result
     */
    isNotNull: function(value, message) {
        const passed = value !== null && value !== undefined;
        TestResults.addResult(passed);
        
        if (passed) {
            console.log(`✅ ${message}`);
        } else {
            console.log(`❌ ${message}`);
            console.log(`   💥 Expected non-null value, got: ${value}`);
        }
        
        return passed;
    },

    /**
     * Assert that a string contains a substring
     * @param {string} actual - String to search in
     * @param {string} expected - Substring to find
     * @param {string} message - Test description
     * @returns {boolean} Test result
     */
    contains: function(actual, expected, message) {
        const passed = String(actual).includes(String(expected));
        TestResults.addResult(passed);
        
        if (passed) {
            console.log(`✅ ${message}`);
        } else {
            console.log(`❌ ${message}`);
            console.log(`   💥 Expected '${actual}' to contain '${expected}'`);
        }
        
        return passed;
    },

    /**
     * Assert that a string does not contain a substring
     * @param {string} actual - String to search in
     * @param {string} notExpected - Substring that should not be found
     * @param {string} message - Test description
     * @returns {boolean} Test result
     */
    doesNotContain: function(actual, notExpected, message) {
        const passed = !String(actual).includes(String(notExpected));
        TestResults.addResult(passed);
        
        if (passed) {
            console.log(`✅ ${message}`);
        } else {
            console.log(`❌ ${message}`);
            console.log(`   💥 Expected '${actual}' to NOT contain '${notExpected}'`);
        }
        
        return passed;
    }
};

/**
 * Test organization functions
 */
const describe = function(suiteName, testFunction) {
    console.log(`\n📁 Test Suite: ${suiteName}`);
    console.log('=' + '='.repeat(suiteName.length + 12));
    testFunction();
};

const it = function(testName, testFunction) {
    console.log(`\n🧪 ${testName}`);
    testFunction();
};

/**
 * Test lifecycle functions
 */
const beforeEach = function(setupFunction) {
    // Simple implementation - just call the function
    // In a more complex framework, this would be called before each test
    setupFunction();
};

const afterEach = function(teardownFunction) {
    // Simple implementation - just call the function
    // In a more complex framework, this would be called after each test
    teardownFunction();
};

/**
 * Test runner utilities
 */
const TestUtils = {
    /**
     * Wait for a specified amount of time
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise} Promise that resolves after the delay
     */
    wait: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Mock a function
     * @param {Function} originalFunction - Function to mock
     * @param {Function} mockImplementation - Mock implementation
     * @returns {Object} Mock object with restore method
     */
    mock: function(originalFunction, mockImplementation) {
        const original = originalFunction;
        const mock = mockImplementation;
        
        return {
            restore: function() {
                return original;
            },
            mock: mock
        };
    },

    /**
     * Create a spy function that tracks calls
     * @param {Function} originalFunction - Function to spy on
     * @returns {Function} Spy function
     */
    spy: function(originalFunction) {
        const calls = [];
        
        const spy = function(...args) {
            calls.push(args);
            if (originalFunction) {
                return originalFunction.apply(this, args);
            }
        };
        
        spy.calls = calls;
        spy.callCount = function() { return calls.length; };
        spy.calledWith = function(...args) {
            return calls.some(call => 
                call.length === args.length && 
                call.every((arg, i) => arg === args[i])
            );
        };
        
        return spy;
    }
};