// Simple vanilla JavaScript dataglove functionality

function datagloveInit() {
    console.log('DataGlove initialized');
}

function datagloveProcess(data) {
    console.log('Processing data:', data);
    return data;
}

// Global variables for scene objects
let scene, camera, renderer, circle, redPoint, redLine, blueLine, greenLine;

// Three.js scene setup
function initThreeScene() {
    // Scene setup
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
    renderer.setClearColor(0x2a2a2a); // Dark background for better contrast
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Calculate correct aspect ratio based on canvas size
    const canvasWidth = window.innerWidth * 0.75;
    const canvasHeight = window.innerHeight * 0.75;
    const aspectRatio = canvasWidth / canvasHeight;
    
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    
    // Create white disk with proper thickness
    const diskGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 32);
    const diskMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    circle = new THREE.Mesh(diskGeometry, diskMaterial);
    scene.add(circle);
    
    // Create red horizontal line across the disk (X-axis)
    const redLineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2, 0, 0.06),
        new THREE.Vector3(2, 0, 0.06)
    ]);
    const redLineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 3 });
    redLine = new THREE.Line(redLineGeometry, redLineMaterial);
    scene.add(redLine);
    
    // Create blue vertical line across the disk (Y-axis)
    const blueLineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -2, 0.06),
        new THREE.Vector3(0, 2, 0.06)
    ]);
    const blueLineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 3 });
    blueLine = new THREE.Line(blueLineGeometry, blueLineMaterial);
    scene.add(blueLine);
    
    // Create green Z-axis line perpendicular to the disk
    const greenLineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -3),
        new THREE.Vector3(0, 0, 3)
    ]);
    const greenLineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 3 });
    greenLine = new THREE.Line(greenLineGeometry, greenLineMaterial);
    scene.add(greenLine);
    
    // Create red point in center
    const pointGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    redPoint = new THREE.Mesh(pointGeometry, pointMaterial);
    scene.add(redPoint);
    
    // Add lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Camera position
    camera.position.z = 6;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
    
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
        
        // Rotate all objects together
        circle.rotation.set(
            THREE.MathUtils.degToRad(pitch),
            THREE.MathUtils.degToRad(yaw),
            THREE.MathUtils.degToRad(roll)
        );
        redPoint.rotation.set(
            THREE.MathUtils.degToRad(pitch),
            THREE.MathUtils.degToRad(yaw),
            THREE.MathUtils.degToRad(roll)
        );
        redLine.rotation.set(
            THREE.MathUtils.degToRad(pitch),
            THREE.MathUtils.degToRad(yaw),
            THREE.MathUtils.degToRad(roll)
        );
        blueLine.rotation.set(
            THREE.MathUtils.degToRad(pitch),
            THREE.MathUtils.degToRad(yaw),
            THREE.MathUtils.degToRad(roll)
        );
        greenLine.rotation.set(
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
