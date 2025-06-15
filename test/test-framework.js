// ===== SIMPLE TESTING FRAMEWORK =====

class TestFramework {
    constructor() {
        this.tests = [];
        this.suites = [];
        this.currentSuite = null;
        this.beforeEachFn = null;
        this.afterEachFn = null;
        this.results = {
            passed: 0,
            failed: 0,
            total: 0
        };
    }

    describe(name, callback) {
        this.currentSuite = { name, tests: [], beforeEach: null, afterEach: null };
        this.suites.push(this.currentSuite);
        
        this.beforeEachFn = null;
        this.afterEachFn = null;
        
        callback();
        
        this.currentSuite.beforeEach = this.beforeEachFn;
        this.currentSuite.afterEach = this.afterEachFn;
        
        this.currentSuite = null;
        this.beforeEachFn = null;
        this.afterEachFn = null;
    }

    it(description, testFunction) {
        const test = {
            description,
            testFunction,
            suite: this.currentSuite?.name || 'Global',
            suiteObj: this.currentSuite
        };
        
        if (this.currentSuite) {
            this.currentSuite.tests.push(test);
        }
        
        this.tests.push(test);
    }

    beforeEach(fn) {
        this.beforeEachFn = fn;
    }

    afterEach(fn) {
        this.afterEachFn = fn;
    }

    async runAll() {
        console.log('🧪 Running TPA Scorekeeper Tests...\n');
        
        for (const test of this.tests) {
            await this.runTest(test);
        }
        
        this.displayResults();
    }

    async runTest(test) {
        this.results.total++;
        
        try {
            if (test.suiteObj && test.suiteObj.beforeEach) {
                await test.suiteObj.beforeEach();
            }
            
            await test.testFunction();
            
            if (test.suiteObj && test.suiteObj.afterEach) {
                await test.suiteObj.afterEach();
            }
            
            this.results.passed++;
            this.logResult('✅', test.suite, test.description);
        } catch (error) {
            this.results.failed++;
            this.logResult('❌', test.suite, test.description, error.message);
        }
    }

    logResult(icon, suite, description, error = null) {
        console.log(`${icon} [${suite}] ${description}`);
        if (error) {
            console.log(`   💥 ${error}`);
        }
    }

    displayResults() {
        console.log('\n📊 Test Results:');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📝 Total:  ${this.results.total}`);
        
        const percentage = ((this.results.passed / this.results.total) * 100).toFixed(1);
        console.log(`📈 Success Rate: ${percentage}%`);
        
        if (this.results.failed === 0) {
            console.log('\n🎉 All tests passed!');
        } else {
            console.log(`\n⚠️  ${this.results.failed} test(s) failed`);
        }
    }
}

// ===== ASSERTION FUNCTIONS =====

const TestAssert = {
    ok: function(value, message = 'Expected truthy value') {
        if (!value) {
            throw new Error(message);
        }
    },

    equal: function(actual, expected, message = null) {
        if (actual !== expected) {
            const msg = message || `Expected ${expected}, got ${actual}`;
            throw new Error(msg);
        }
    },

    deepEqual: function(actual, expected, message = null) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            const msg = message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`;
            throw new Error(msg);
        }
    },

    throws: function(fn, message = 'Expected function to throw') {
        let threw = false;
        try {
            fn();
        } catch (e) {
            threw = true;
        }
        if (!threw) {
            throw new Error(message);
        }
    },

    isNull: function(value, message = 'Expected null or undefined') {
        if (value !== null && value !== undefined) {
            throw new Error(message);
        }
    },

    isNotNull: function(value, message = 'Expected non-null value') {
        if (value === null || value === undefined) {
            throw new Error(message);
        }
    },

    doesNotThrow: function(fn, message = 'Function should not throw') {
        try {
            fn();
        } catch (error) {
            throw new Error(message + ': ' + error.message);
        }
    }
};

// Create global test instance
const testFramework = new TestFramework();
const describe = testFramework.describe.bind(testFramework);
const it = testFramework.it.bind(testFramework);
const beforeEach = testFramework.beforeEach.bind(testFramework);
const afterEach = testFramework.afterEach.bind(testFramework);
const runTests = testFramework.runAll.bind(testFramework);

// Make assert available globally
const assert = TestAssert;