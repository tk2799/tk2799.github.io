// Attendre que le DOM soit complètement chargé
console.log('Script auth.js chargé');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM chargé, initialisation...');
  
  // Éléments du DOM
  const connexionBtn = document.getElementById('connexionBtn');
  const authModal = document.getElementById('authModal');
  const descModal = document.getElementById('descModal');
  const closeButtons = document.querySelectorAll('.close');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toRegister = document.getElementById('toRegister');
  const toLogin = document.getElementById('toLogin');

  const userArea = document.getElementById('userArea');
  const profileArea = document.getElementById('profileArea');
  const profileImg = document.getElementById('profileImg');
  const pseudoDisplay = document.getElementById('pseudoDisplay');

  const imageInput = document.getElementById('imageInput');
  const previewImg = document.getElementById('previewImg');
  const descBtn = document.getElementById('descBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  const descForm = document.getElementById('descForm');
  const descText = document.getElementById('descText');
  const charCount = document.getElementById('charCount');

  // Vérifier que les éléments existent
  console.log('Connexion btn:', connexionBtn);
  console.log('Auth modal:', authModal);
  
  // Données utilisateur
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // INITIALISATION
  if (currentUser) {
    console.log('Utilisateur trouvé:', currentUser.pseudo);
    showProfile();
  } else {
    console.log('Aucun utilisateur connecté');
    if (userArea) userArea.style.display = 'flex';
    if (profileArea) profileArea.style.display = 'none';
  }

  // SETUP DES ÉVÉNEMENTS
  if (connexionBtn) {
    connexionBtn.addEventListener('click', function(e) {
      console.log('Bouton connexion cliqué');
      e.preventDefault();
      openAuthModal();
    });
  }
  
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
      }
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.classList.remove('show');
    if (e.target === descModal) descModal.classList.remove('show');
  });

  if (toRegister) toRegister.addEventListener('click', switchToRegister);
  if (toLogin) toLogin.addEventListener('click', switchToLogin);

  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (registerForm) registerForm.addEventListener('submit', handleRegister);

  if (imageInput) imageInput.addEventListener('change', handleImagePreview);

  if (descBtn) descBtn.addEventListener('click', openDescModal);
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  if (descForm) descForm.addEventListener('submit', handleDescSave);
  if (descText) descText.addEventListener('input', updateCharCount);

  // MODAL AUTHENTICATION
  function openAuthModal() {
    console.log('Ouverture modal auth');
    authModal.classList.add('show');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  }

  function switchToRegister() {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
  }

  function switchToLogin() {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
  }

  // GESTION IMAGE PREVIEW
  function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previewImg.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // FORMULAIRES
  function handleLogin(e) {
    e.preventDefault();
    
    const pseudo = document.getElementById('loginPseudo').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.pseudo === pseudo && u.password === password);

    if (user) {
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      authModal.classList.remove('show');
      
      loginForm.reset();
      document.getElementById('loginPseudo').value = '';
      document.getElementById('loginPassword').value = '';
      
      showProfile();
    } else {
      alert('Pseudo ou mot de passe incorrect!');
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    
    const pseudo = document.getElementById('regPseudo').value;
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    const imageData = previewImg.src;

    if (password !== passwordConfirm) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }

    if (pseudo.length < 3) {
      alert('Le pseudo doit avoir au moins 3 caractères!');
      return;
    }

    if (imageData === 'https://via.placeholder.com/150') {
      alert('Veuillez choisir une photo!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.pseudo === pseudo)) {
      alert('Ce pseudo est déjà utilisé!');
      return;
    }

    const newUser = {
      id: Date.now(),
      pseudo: pseudo,
      password: password,
      image: imageData,
      description: ''
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    switchToLogin();
    alert('Compte créé avec succès! Veuillez vous connecter.');
    
    registerForm.reset();
    document.getElementById('regPseudo').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regPasswordConfirm').value = '';
    previewImg.src = 'https://via.placeholder.com/150';
  }

  // AFFICHER PROFIL
  function showProfile() {
    if (!currentUser) return;
    
    if (userArea) userArea.style.display = 'none';
    if (profileArea) profileArea.style.display = 'flex';
    
    if (profileImg && currentUser.image) {
      profileImg.src = currentUser.image;
    }
    
    if (pseudoDisplay && currentUser.pseudo) {
      pseudoDisplay.textContent = currentUser.pseudo;
    }
  }

  // MODAL DESCRIPTION
  function openDescModal() {
    descModal.classList.add('show');
    if (descText) {
      descText.value = currentUser && currentUser.description ? currentUser.description : '';
      updateCharCount();
    }
  }

  function handleDescSave(e) {
    e.preventDefault();
    
    if (!currentUser) return;
    
    currentUser.description = descText ? descText.value : '';
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    descModal.classList.remove('show');
    alert('Description enregistrée!');
  }

  function updateCharCount() {
    if (descText && charCount) {
      charCount.textContent = descText.value.length;
    }
  }

  // DÉCONNEXION
  function handleLogout() {
    if (confirm('Veux-tu vraiment te déconnecter?')) {
      currentUser = null;
      localStorage.removeItem('currentUser');
      
      if (userArea) userArea.style.display = 'flex';
      if (profileArea) profileArea.style.display = 'none';

      if (loginForm) loginForm.reset();
      if (registerForm) registerForm.reset();
      if (previewImg) previewImg.src = 'https://via.placeholder.com/150';
      
      alert('Déconnexion réussie!');
    }
  }
});
