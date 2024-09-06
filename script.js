// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {
    apiKey: "AIzaSyCm7RrhinGiA0HO34sRj_iEMimyo9SQxPg",
    authDomain: "website-7b9ea.firebaseapp.com",
    projectId: "website-7b9ea",
    storageBucket: "website-7b9ea.appspot.com",
    messagingSenderId: "1001291708775",
    appId: "1:1001291708775:web:dccefc2e614da42809d7c2"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Serviços Firebase
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Login
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Login bem-sucedido:', userCredential.user);
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
  });
  
  // Cadastro
  const signupForm = document.getElementById('signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Usuário criado:', userCredential.user);
        
        // Salvar dados do usuário no Firestore
        return db.collection('users').add({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
      })
      .then(() => {
        console.log('Dados do usuário salvos no Firestore');
        loadUsers();
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
      });
  });
  
  // Carregar usuários do Firestore
  function loadUsers() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';
  
    db.collection('users').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const user = doc.data();
          const li = document.createElement('li');
          li.textContent = `Email: ${user.email}`;
          usersList.appendChild(li);
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar usuários:', error);
      });
  }
  
  // Carregar usuários ao carregar a página
  window.onload = loadUsers;
  