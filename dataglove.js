

// Simple vanilla JavaScript dataglove functionality

function datagloveInit() {
    console.log('DataGlove initialized');
}

function datagloveProcess(data) {
    console.log('Processing data:', data);
    return data;
}

// Global variables for scene objects
let scene, camera, renderer, circle, redPoint;

// Three.js scene setup
function initThreeScene() {
    // Scene setup
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Calculate correct aspect ratio based on canvas size
    const canvasWidth = window.innerWidth * 0.75;
    const canvasHeight = window.innerHeight * 0.75;
    const aspectRatio = canvasWidth / canvasHeight;
    
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    
    // Create white circle
    const circleGeometry = new THREE.CircleGeometry(2, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    circle = new THREE.Mesh(circleGeometry, circleMaterial);
    scene.add(circle);
    
    // Create red point in center
    const pointGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    redPoint = new THREE.Mesh(pointGeometry, pointMaterial);
    scene.add(redPoint);
    
    // Camera position
    camera.position.z = 5;
    
    // Render the scene
    renderer.render(scene, camera);
    
    // Setup slider controls
    setupControls();
    
    console.log('Three.js scene initialized');
}

// Setup slider controls
function setupControls() {
    const xSlider = document.getElementById('x-axis');
    const ySlider = document.getElementById('y-axis');
    const zSlider = document.getElementById('z-axis');
    
    const xValue = xSlider.nextElementSibling;
    const yValue = ySlider.nextElementSibling;
    const zValue = zSlider.nextElementSibling;
    
    // Update positions when sliders change
    function updatePositions() {
        const x = parseFloat(xSlider.value);
        const y = parseFloat(ySlider.value);
        const z = parseFloat(zSlider.value);
        
        // Move both objects together
        circle.position.set(x, y, z);
        redPoint.position.set(x, y, z);
        
        // Update display values
        xValue.textContent = x;
        yValue.textContent = y;
        zValue.textContent = z;
        
        // Re-render scene
        renderer.render(scene, camera);
    }
    
    // Add event listeners to all sliders
    xSlider.addEventListener('input', updatePositions);
    ySlider.addEventListener('input', updatePositions);
    zSlider.addEventListener('input', updatePositions);
    
    // Initialize positions
    updatePositions();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    datagloveInit();
    initThreeScene();
});
