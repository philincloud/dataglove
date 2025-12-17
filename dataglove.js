
// Simple vanilla JavaScript dataglove functionality

function datagloveInit() {
    console.log('DataGlove initialized');
}

function datagloveProcess(data) {
    console.log('Processing data:', data);
    return data;
}

// Three.js scene setup
function initThreeScene() {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Create white circle
    const circleGeometry = new THREE.CircleGeometry(2, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    scene.add(circle);
    
    // Create red point in center
    const pointGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const redPoint = new THREE.Mesh(pointGeometry, pointMaterial);
    scene.add(redPoint);
    
    // Camera position
    camera.position.z = 5;
    
    // Render the scene
    renderer.render(scene, camera);
    
    console.log('Three.js scene initialized');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    datagloveInit();
    initThreeScene();
});
