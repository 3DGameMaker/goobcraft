// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a grid of cubes
const voxelSize = 1;
const gridSize = 10;

for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
            const geometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, y, z);
            scene.add(cube);
        }
    }
}

// Position the camera
camera.position.z = 20;
camera.position.x = 10;
camera.position.y = 10;

// Simple camera movement
const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false,
};

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW': controls.forward = true; break;
        case 'KeyS': controls.backward = true; break;
        case 'KeyA': controls.left = true; break;
        case 'KeyD': controls.right = true; break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW': controls.forward = false; break;
        case 'KeyS': controls.backward = false; break;
        case 'KeyA': controls.left = false; break;
        case 'KeyD': controls.right = false; break;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (controls.forward) camera.position.z -= 0.1;
    if (controls.backward) camera.position.z += 0.1;
    if (controls.left) camera.position.x -= 0.1;
    if (controls.right) camera.position.x += 0.1;

    renderer.render(scene, camera);
}
animate();
