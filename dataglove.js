

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
    

    // Update rotation when sliders change
    function updateRotation() {
        const pitch = parseFloat(xSlider.value);
        const yaw = parseFloat(ySlider.value);
        const roll = parseFloat(zSlider.value);
        
        // Rotate both objects together
        circle.rotation.set(
            THREE.MathUtils.degToRad(pitch), // X-axis (pitch)
            THREE.MathUtils.degToRad(yaw),   // Y-axis (yaw)
            THREE.MathUtils.degToRad(roll)   // Z-axis (roll)
        );
        redPoint.rotation.set(
            THREE.MathUtils.degToRad(pitch),
            THREE.MathUtils.degToRad(yaw),
            THREE.MathUtils.degToRad(roll)
        );
        
        // Update display values
        xValue.textContent = pitch + '°';
        yValue.textContent = yaw + '°';
        zValue.textContent = roll + '°';
        
        // Re-render scene
        renderer.render(scene, camera);
    }
    

    // Add event listeners to all sliders
    xSlider.addEventListener('input', updateRotation);
    ySlider.addEventListener('input', updateRotation);
    zSlider.addEventListener('input', updateRotation);
    
    // Initialize rotation
    updateRotation();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    datagloveInit();
    initThreeScene();
});
