# 🧪 TPA Scorekeeper - Test Suite

## 📁 Struttura Test Directory

```
test/
├── test-runner.html          ← Test runner page (UI)
├── test-framework.js         ← Simple test framework
├── test-number-click.js      ← Specific test for number click logic
└── README.md                 ← This file
```

## 🚀 Come Eseguire i Test

### **Metodo 1: Test Runner (Raccomandato)**
1. Apri `test/test-runner.html` nel browser
2. Clicca "🔢 Run Number Click Test" 
3. Osserva i risultati nella console di output

### **Metodo 2: Console Browser (Debug)**
1. Apri `test/test-runner.html`
2. Apri Developer Tools (F12) → Console
3. Osserva anche il log dettagliato nella console browser

## 📋 Test Disponibili

### **✅ Number Click Logic Test**
**File:** `test-number-click.js`

**Cosa testa:**
- ✅ Primo click: mostra solo `³` (non `²2`)
- ✅ Secondo click: mostra `³5`
- ✅ Terzo click: nessun effetto (box pieno)
- ✅ Edge cases: numeri 0 e 10
- ✅ Player 2: isolamento tra giocatori

**Test Cases:**
1. `should show only superscript on first click`
2. `should show superscript + normal number on second click`
3. `should do nothing on third click (box full)`
4. `should handle edge cases (0 and 10)`
5. `should work correctly for player 2`

## 🎯 Esempio Output Atteso

```
🧪 Running Number Click Test...

📁 Test Suite: Number Click Logic (REAL CODE)
============================================

🧪 should show only superscript on first click
✅ topNumber should be 2
✅ bottomNumber should be null
✅ Display should be exactly "<sup>2</sup>"
✅ Display should NOT contain "2</sup>2"
✅ Display should NOT contain normal "2" after superscript

🧪 should show superscript + normal number on second click
✅ topNumber should still be 3
✅ bottomNumber should be 5
✅ Display should be exactly "<sup>3</sup>5"

🧪 should do nothing on third click (box full)
✅ topNumber should not change
✅ bottomNumber should not change
✅ Display should not change
✅ Display should remain "<sup>1</sup>7"

🧪 should handle edge cases (0 and 10)
✅ Should handle 0 correctly
✅ Display should show "<sup>0</sup>"
✅ Should handle 10 correctly
✅ Display should show "<sup>0</sup>10"

🧪 should work correctly for player 2
✅ Player 1 box should remain empty
✅ Player 2 topNumber should be 4
✅ Player 2 display should show "<sup>4</sup>"

🧪 should verify function availability
✅ handleNumberClick should be loaded from match.js
✅ MatchState should be available (mocked)
✅ updatePlayerDisplay should be available (mocked)

📊 Test Results:
✅ Passed: 18
❌ Failed: 0
📝 Total: 18
📈 Success Rate: 100.0%

🎉 All tests passed!
```

## 🔧 Architettura Test

### **Test Framework (`test-framework.js`)**
- ✅ Assertion functions: `assert.ok()`, `assert.equal()`, `assert.contains()`
- ✅ Test organization: `describe()`, `it()`
- ✅ Result tracking: `TestResults.summary()`
- ✅ Utilities: `TestUtils.mock()`, `TestUtils.spy()`

### **Real Code Testing**
- ✅ **Imports real functions**: Carica `../js/match.js` e testa `handleNumberClick()` originale
- ✅ **No code duplication**: Nessuna copia di codice, solo test delle funzioni vere
- ✅ **Mock dependencies only**: Mock solo DOM e localStorage, non la logica
- ✅ **Setup/Teardown**: Sostituisce temporaneamente dipendenze, poi ripristina

### **Mock System (Dependencies Only)**
- ✅ **Mock MatchState**: Sostituisce oggetto globale durante test
- ✅ **Mock DOM functions**: Sostituisce `updatePlayerDisplay()` per testing isolato
- ✅ **Mock localStorage**: Sostituisce `saveMatchState()` per evitare side effects
- ❌ **No logic mocking**: La logica `handleNumberClick()` è quella vera da `match.js`

### **Isolated Testing Approach**
```javascript
// GIUSTO: Test funzione reale con dipendenze mockkate
TestSetup.setup();          // Mock dependencies
handleNumberClick(2);       // Call REAL function from match.js  
assert.equal(result, expected); // Test real behavior
TestSetup.teardown();       // Restore original dependencies
```

## 📝 Aggiungere Nuovi Test

### **1. Creare Nuovo Test File**
```javascript
// test/test-my-feature.js

async function runMyFeatureTest() {
    TestResults.reset();
    
    describe('My Feature', function() {
        it('should do something specific', function() {
            // Test logic here
            assert.equal(actual, expected, 'Description');
        });
    });
    
    TestResults.summary();
    return TestResults.failed === 0;
}
```

### **2. Aggiungere al Test Runner**
```html
<!-- In test-runner.html -->
<script src="test-my-feature.js"></script>

<button id="runMyFeatureTest" class="btn">
    🔧 Run My Feature Test
</button>
```

```javascript
// Nel test-runner.html script
document.getElementById('runMyFeatureTest').addEventListener('click', () => {
    runSpecificTest('MyFeature');
});
```

## 🐛 Debugging Test

### **Console Output**
- Tutti i test loggano nella console browser
- Output dettagliato per ogni assertion
- Stack trace per errori

### **Mock Inspection**
```javascript
// Ispezionare stato mock durante test
console.log('MockState:', NumberClickMocks.MockMatchState);
console.log('Mock DOM:', NumberClickMocks.mockWhiteLabels);
```

### **Test Isolation**
- Ogni test chiama `NumberClickMocks.reset()`
- Nessuna interferenza tra test
- Stato pulito per ogni test case

## 🎯 Best Practices

1. **Un test, una responsabilità**: Ogni test verifica un comportamento specifico
2. **Nomi descriptivi**: `should show only superscript on first click`
3. **Setup/teardown**: Sempre resettare stato prima del test
4. **Assertions multiple**: Verificare tutti gli aspetti importanti
5. **Edge cases**: Testare valori limite (0, 10, null, etc.)

## 🚀 Esecuzione Continua

Per sviluppo iterativo:
1. Modifica il codice in `js/match.js`
2. Ricarica `test/test-runner.html`
3. Ri-esegui i test
4. Verifica che passino tutti
5. Ripeti

---

**Test strutturati, modulari e affidabili per garantire la qualità del codice!** 🎯