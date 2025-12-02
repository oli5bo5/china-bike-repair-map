/**
 * Test-Script für Supabase Authentication
 * 
 * Verwendung:
 * node scripts/test-auth.js
 */

// Laden von dotenv für lokale .env.local Variablen
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 Supabase Connection Test\n');
console.log('=' .repeat(50));

// 1. Environment Variables prüfen
console.log('\n1️⃣ Environment Variables Check:');
console.log('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.log('\n❌ ERROR: Supabase credentials fehlen!');
  console.log('   Bitte .env.local erstellen mit:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your-url');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key');
  process.exit(1);
}

// 2. URL Format prüfen
console.log('\n2️⃣ URL Format Check:');
if (supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co')) {
  console.log('   ✅ URL Format ist korrekt');
} else {
  console.log('   ⚠️  URL Format könnte falsch sein');
  console.log('   Erwartet: https://[projekt-id].supabase.co');
}

// 3. Key Length prüfen
console.log('\n3️⃣ API Key Check:');
if (supabaseKey.length > 100) {
  console.log('   ✅ Key Länge sieht gut aus (' + supabaseKey.length + ' Zeichen)');
} else {
  console.log('   ⚠️  Key könnte zu kurz sein (' + supabaseKey.length + ' Zeichen)');
}

// 4. Connection Test (einfach)
console.log('\n4️⃣ Connection Test:');
console.log('   Teste Verbindung zu:', supabaseUrl);

fetch(supabaseUrl + '/rest/v1/', {
  headers: {
    'apikey': supabaseKey,
    'Authorization': 'Bearer ' + supabaseKey
  }
})
  .then(response => {
    if (response.status === 200 || response.status === 404) {
      console.log('   ✅ Verbindung erfolgreich!');
      console.log('   Status Code:', response.status);
    } else {
      console.log('   ⚠️  Unerwartete Response:', response.status);
    }
  })
  .catch(error => {
    console.log('   ❌ Verbindungsfehler:', error.message);
  })
  .finally(() => {
    console.log('\n' + '='.repeat(50));
    console.log('\n✅ Test abgeschlossen!');
    console.log('\nNächste Schritte:');
    console.log('1. Starten Sie den Dev-Server: npm run dev');
    console.log('2. Öffnen Sie: http://localhost:3000/auth/register');
    console.log('3. Registrieren Sie einen Test-Account');
    console.log('\n');
  });

