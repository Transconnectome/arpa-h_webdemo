// SwiFT Demo v2 (Slide/Scene Transition Mode)
const scenes = document.querySelectorAll('.scene');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentSceneNum = document.getElementById('current-scene-num');
const totalSceneNum = document.getElementById('total-scene-num');
const navSteps = document.querySelectorAll('.nav-step');
const startBtn = document.getElementById('start-btn');
const svgLayer = document.getElementById('svg-layer');

let currentScene = 0;
const totalScenes = scenes.length;
let autoPlayInterval = null;
const AUTO_PLAY_DELAY = 6000; // 6 seconds per slide

if (totalSceneNum) totalSceneNum.textContent = totalScenes - 1; // Show 0 to 6 as 1 to 7 if wanted, 6 max. Let's just use 0-6 index for display

function startAutoPlay() {
    stopAutoPlay(); // clear any existing interval
    autoPlayInterval = setInterval(() => {
        if (currentScene < totalScenes - 1) {
            currentScene++;
            updateScene();
        } else {
            stopAutoPlay(); // Stop at the end
        }
    }, AUTO_PLAY_DELAY);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function updateScene() {
    // Hide all scenes
    scenes.forEach(scene => scene.classList.remove('active'));
    // Show current scene
    scenes[currentScene].classList.add('active');

    // Update buttons
    if (currentScene === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentScene === totalScenes - 1) {
        nextBtn.disabled = true;
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.disabled = false;
        nextBtn.textContent = 'Next →';
    }

    // Update Indicator text
    if (currentSceneNum) currentSceneNum.textContent = currentScene;
    if (totalSceneNum) totalSceneNum.textContent = totalScenes - 1;

    // Update Top Navigation highlighting
    navSteps.forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'), 10);
        if (stepNum <= currentScene) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Trigger specific animations per scene
    triggerSceneAnimation(currentScene);
}

// Next Button
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentScene < totalScenes - 1) {
            currentScene++;
            updateScene();
            // User interacted, restart timer
            if (currentScene > 0 && currentScene < totalScenes - 1) startAutoPlay();
        }
    });
}

// Prev Button
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentScene > 0) {
            currentScene--;
            updateScene();
            // User interacted, restart timer
            if (currentScene > 0 && currentScene < totalScenes - 1) startAutoPlay();
        }
    });
}

// Scene 0 will just auto-play into the next scene automatically now

// Optional: specific animations per scene
function triggerSceneAnimation(index) {
    // Hide SVG paths on all except 0 to reset
    svgLayer.style.display = 'none';

    // Scene 0: Power-up (Suck-in effect can be added back if desired via css animations)
    if (index === 0) {
        // Restart CSS animation by re-adding classes if necessary
        const powerContainer = document.getElementById('power-up-container');
        const pillars = document.querySelectorAll('.power-pillar');
        const powerMessage = document.getElementById('power-message');

        if (powerContainer) {
            powerContainer.classList.remove('active');
            void powerContainer.offsetWidth; // trigger reflow
            powerContainer.classList.add('active');
        }

        pillars.forEach((pillar, i) => {
            pillar.classList.remove('active');
            setTimeout(() => {
                pillar.classList.add('active');
            }, 500 + (i * 300)); // Staggered pillar spawn
        });

        if (powerMessage) {
            powerMessage.classList.remove('active');
            setTimeout(() => {
                powerMessage.classList.add('active');
            }, 1500);
        }
    }

    // Scene 3: Backbone Iso-Blocks
    if (index === 3) {
        const blocks = document.querySelectorAll('#backbone-container .iso-block');
        blocks.forEach((block, i) => {
            // Initial hidden state (sunken and transparent)
            block.style.transition = 'none';
            block.style.opacity = 0;
            block.style.transform = 'rotateX(60deg) rotateZ(-45deg) translateZ(-40px)';

            // Trigger animation after brief delay to ensure 'none' is applied
            setTimeout(() => {
                block.style.transition = `opacity 1.0s ease-out ${i * 0.4}s, transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.4}s`;
                block.style.opacity = 1;
                // .active class state puts translateZ to 20px
                block.style.transform = 'rotateX(60deg) rotateZ(-45deg) translateZ(20px)';
            }, 50);
        });
    }

    // Scene 4: Downstream Morph
    if (index === 4) {
        const latent = document.getElementById('iso-latent');
        const arrow = document.querySelector('.flow-arrow-right');
        const head = document.getElementById('iso-head');

        // Reset states
        latent.classList.remove('morphing');
        arrow.style.opacity = 0;
        head.style.opacity = 0;

        // Trigger reflow
        void latent.offsetWidth;

        // Start morph animation
        latent.classList.add('morphing');

        // Reveal rest of pipeline after morph finishes (approx 1.5s)
        setTimeout(() => {
            arrow.style.transition = 'opacity 0.8s';
            arrow.style.opacity = 1;

            setTimeout(() => {
                head.style.transition = 'opacity 1s';
                head.style.opacity = 1;
            }, 600);
        }, 1500);
    }

    // Scene 5: Prediction Card Flip
    if (index === 5) {
        const cards = document.querySelectorAll('.result-card');
        cards.forEach(card => card.classList.remove('flipped')); // start front
        setTimeout(() => {
            cards.forEach(card => card.classList.add('flipped')); // flip to back
        }, 800);
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    updateScene();
    startAutoPlay(); // Auto-play starts as soon as demo loads
});
