class Game {
  constructor() {
    this.gameState = 'menu';
    this.p1Health = 100;
    this.p2Health = 100;
    this.timer = 99;
    
    const canvas = document.getElementById('gameCanvas');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 3, 10);
    
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    
    this.setupLights();
    this.setupArena();
    this.animate();
    
    window.addEventListener('resize', () => this.onWindowResize());
  }
  
  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 10);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
  }
  
  setupArena() {
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x2d3561 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    
    const wallGeo = new THREE.BoxGeometry(20, 5, 1);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
    
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.z = -10;
    backWall.position.y = 2.5;
    this.scene.add(backWall);
  }
  
  animate = () => {
    requestAnimationFrame(this.animate);
    
    if (this.gameState === 'playing') {
      this.timer -= 1/60;
      document.getElementById('timer').textContent = Math.ceil(this.timer);
      document.getElementById('p1Health').style.width = this.p1Health + '%';
      document.getElementById('p2Health').style.width = this.p2Health + '%';
      
      if (Math.random() < 0.002) this.p1Health -= 1;
      if (Math.random() < 0.002) this.p2Health -= 1;
      
      if (this.p1Health <= 0 || this.p2Health <= 0 || this.timer <= 0) {
        this.gameState = 'menu';
        document.getElementById('mainMenu').classList.remove('hidden');
        document.getElementById('gameHUD').classList.add('hidden');
      }
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

const game = new Game();

function startGame() {
  game.gameState = 'playing';
  game.p1Health = 100;
  game.p2Health = 100;
  game.timer = 99;
  document.getElementById('mainMenu').classList.add('hidden');
  document.getElementById('gameHUD').classList.remove('hidden');
}

function showSettings() {
  alert('Settings coming soon!');
}
