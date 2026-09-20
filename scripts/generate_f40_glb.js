import fs from 'fs';
import path from 'path';
import * as THREE from 'three';

// Node.js polyfills for Three.js GLTFExporter
if (typeof globalThis.FileReader === 'undefined') {
  class FileReader {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        if (this.onloadend) this.onloadend();
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        const base64 = Buffer.from(buf).toString('base64');
        this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
        if (this.onloadend) this.onloadend();
      });
    }
  }
  globalThis.FileReader = FileReader;
}

import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

function createFerrariF40Model() {
  const car = new THREE.Group();
  car.name = 'Ferrari_F40_1_64_Diecast';

  // --- Materials (PBR Authentic Automotive Paint & Finishes) ---
  const rossoCorsa = new THREE.MeshStandardMaterial({
    color: 0xcc111a, // Classic Ferrari Rosso Corsa
    roughness: 0.15,
    metalness: 0.12,
    envMapIntensity: 1.2
  });

  const satinBlackTrim = new THREE.MeshStandardMaterial({
    color: 0x141517,
    roughness: 0.5,
    metalness: 0.3
  });

  const carbonSplitter = new THREE.MeshStandardMaterial({
    color: 0x1a1c1e,
    roughness: 0.4,
    metalness: 0.4
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0f3f6,
    roughness: 0.15,
    metalness: 0.95
  });

  const silverWheelMaterial = new THREE.MeshStandardMaterial({
    color: 0xd8dde4,
    roughness: 0.22,
    metalness: 0.85
  });

  const tireRubberMaterial = new THREE.MeshStandardMaterial({
    color: 0x18191b,
    roughness: 0.85,
    metalness: 0.05
  });

  const brakeRotorMaterial = new THREE.MeshStandardMaterial({
    color: 0x9ca3af,
    roughness: 0.35,
    metalness: 0.8
  });

  const brakeCaliperMaterial = new THREE.MeshStandardMaterial({
    color: 0xcc111a,
    roughness: 0.3,
    metalness: 0.2
  });

  const smokedGlassMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a212b,
    roughness: 0.08,
    metalness: 0.9,
    transparent: true,
    opacity: 0.72
  });

  const headlightGlass = new THREE.MeshStandardMaterial({
    color: 0xeef2ff,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.85
  });

  const taillightRedGlass = new THREE.MeshStandardMaterial({
    color: 0xdd1118,
    roughness: 0.2,
    metalness: 0.3,
    transparent: true,
    opacity: 0.88
  });

  const taillightAmberGlass = new THREE.MeshStandardMaterial({
    color: 0xfa8c16,
    roughness: 0.2,
    metalness: 0.3,
    transparent: true,
    opacity: 0.88
  });

  const interiorRedFabric = new THREE.MeshStandardMaterial({
    color: 0xb91c1c,
    roughness: 0.8,
    metalness: 0.05
  });

  const interiorDarkTrim = new THREE.MeshStandardMaterial({
    color: 0x1f2124,
    roughness: 0.7,
    metalness: 0.1
  });

  // --- Dimension Parameters (F40 Proportions: ~3.8 units length, ~1.7 units width, ~0.95 units height) ---
  const carLength = 3.8;
  const carWidth = 1.68;
  const wheelBase = 2.15;
  const frontOverhang = 0.95;
  const rearOverhang = 0.7;
  const groundClearance = 0.12;

  // 1. Lower Chassis & Underbody
  const chassisGeo = new THREE.BoxGeometry(carLength * 0.94, 0.08, carWidth * 0.92);
  const chassisMesh = new THREE.Mesh(chassisGeo, satinBlackTrim);
  chassisMesh.position.set(0, groundClearance + 0.04, 0);
  chassisMesh.castShadow = true;
  chassisMesh.receiveShadow = true;
  car.add(chassisMesh);

  // 2. Smooth Wedge Main Body Tub (Symmetric lofted shell)
  // Cross-sections along length X from front (+1.85) to rear (-1.90)
  const bodyMeshGroup = new THREE.Group();

  // Low Front Nose & Front Fenders
  const noseLength = 1.35;
  const noseWidth = 1.58;
  const noseHeight = 0.32;
  const noseShape = new THREE.Shape();
  // Side profile of nose wedge
  noseShape.moveTo(-noseLength / 2, 0);
  noseShape.lineTo(noseLength / 2 - 0.25, 0.02);
  noseShape.quadraticCurveTo(noseLength / 2, 0.08, noseLength / 2, 0.18);
  noseShape.lineTo(noseLength / 2 - 0.05, 0.24);
  noseShape.quadraticCurveTo(0.2, 0.38, -noseLength / 2, 0.44);
  noseShape.closePath();

  const noseExtrudeSettings = {
    steps: 2,
    depth: noseWidth - 0.12,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 4
  };
  const noseGeo = new THREE.ExtrudeGeometry(noseShape, noseExtrudeSettings);
  noseGeo.center();
  const noseMesh = new THREE.Mesh(noseGeo, rossoCorsa);
  noseMesh.rotation.y = Math.PI / 2;
  noseMesh.position.set(1.15, groundClearance + 0.18, 0);
  noseMesh.castShadow = true;
  noseMesh.receiveShadow = true;
  bodyMeshGroup.add(noseMesh);

  // Front Splitter / Chin spoiler
  const splitterGeo = new THREE.BoxGeometry(1.2, 0.04, noseWidth + 0.04);
  const splitter = new THREE.Mesh(splitterGeo, carbonSplitter);
  splitter.position.set(1.35, groundClearance + 0.02, 0);
  splitter.castShadow = true;
  bodyMeshGroup.add(splitter);

  // Lower Front Air Intakes (3 rectangular apertures)
  const frontIntakeCenterGeo = new THREE.BoxGeometry(0.12, 0.11, 0.62);
  const frontIntakeCenter = new THREE.Mesh(frontIntakeCenterGeo, satinBlackTrim);
  frontIntakeCenter.position.set(1.88, groundClearance + 0.1, 0);
  bodyMeshGroup.add(frontIntakeCenter);

  // Side lower intakes with turn signal / fog lamps
  [-0.52, 0.52].forEach((zOffset) => {
    const sideIntakeGeo = new THREE.BoxGeometry(0.12, 0.1, 0.26);
    const sideIntake = new THREE.Mesh(sideIntakeGeo, satinBlackTrim);
    sideIntake.position.set(1.84, groundClearance + 0.1, zOffset);
    bodyMeshGroup.add(sideIntake);

    // Indicator Lens
    const indicatorGeo = new THREE.BoxGeometry(0.04, 0.06, 0.18);
    const indicator = new THREE.Mesh(indicatorGeo, taillightAmberGlass);
    indicator.position.set(1.89, groundClearance + 0.14, zOffset);
    bodyMeshGroup.add(indicator);
  });

  // Twin Triangular NACA Ducts on Front Hood
  [-0.26, 0.26].forEach((zOffset) => {
    const nacaGeo = new THREE.ConeGeometry(0.09, 0.28, 3);
    nacaGeo.rotateX(Math.PI / 2);
    nacaGeo.rotateZ(zOffset > 0 ? 0.12 : -0.12);
    const naca = new THREE.Mesh(nacaGeo, satinBlackTrim);
    naca.scale.set(1, 0.25, 1);
    naca.position.set(1.05, groundClearance + 0.44, zOffset);
    bodyMeshGroup.add(naca);

    // Pop-up headlight cutline covers
    const popupGeo = new THREE.BoxGeometry(0.24, 0.015, 0.26);
    const popup = new THREE.Mesh(popupGeo, rossoCorsa);
    popup.position.set(1.42, groundClearance + 0.38, zOffset * 1.8);
    bodyMeshGroup.add(popup);

    // Clear auxiliary headlight lenses
    const drivingLightGeo = new THREE.BoxGeometry(0.05, 0.08, 0.2);
    const drivingLight = new THREE.Mesh(drivingLightGeo, headlightGlass);
    drivingLight.position.set(1.78, groundClearance + 0.28, zOffset * 1.8);
    bodyMeshGroup.add(drivingLight);
  });

  // Ferrari Emblem Badge on Nose Tip
  const badgeGeo = new THREE.BoxGeometry(0.04, 0.035, 0.024);
  const badgeMat = new THREE.MeshStandardMaterial({ color: 0xffd100, metalness: 0.8, roughness: 0.3 });
  const badge = new THREE.Mesh(badgeGeo, badgeMat);
  badge.position.set(1.87, groundClearance + 0.26, 0);
  bodyMeshGroup.add(badge);

  // 3. Middle Cabin / Coupe Greenhouse & Cockpit
  const cabinLength = 1.45;
  const cabinWidth = 1.34;
  const cabinHeight = 0.52;

  // Smoked Aerodynamic Glass Canopy
  const cabinShape = new THREE.Shape();
  cabinShape.moveTo(-cabinLength / 2 - 0.25, 0);
  cabinShape.lineTo(cabinLength / 2 + 0.15, 0);
  cabinShape.lineTo(cabinLength / 2 - 0.28, cabinHeight); // Raked windshield
  cabinShape.lineTo(-cabinLength / 2 + 0.12, cabinHeight * 0.98); // Roof
  cabinShape.lineTo(-cabinLength / 2 - 0.25, 0.08); // Louvered rear fastback slope
  cabinShape.closePath();

  const cabinExtrudeSettings = {
    steps: 2,
    depth: cabinWidth - 0.08,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 4
  };
  const cabinGeo = new THREE.ExtrudeGeometry(cabinShape, cabinExtrudeSettings);
  cabinGeo.center();
  const cabinMesh = new THREE.Mesh(cabinGeo, smokedGlassMaterial);
  cabinMesh.rotation.y = Math.PI / 2;
  cabinMesh.position.set(0.05, groundClearance + 0.54, 0);
  cabinMesh.castShadow = true;
  bodyMeshGroup.add(cabinMesh);

  // Rosso Corsa Roof Skin & A/B/C Pillars Frame
  const roofSkinGeo = new THREE.BoxGeometry(0.72, 0.04, cabinWidth);
  const roofSkin = new THREE.Mesh(roofSkinGeo, rossoCorsa);
  roofSkin.position.set(-0.02, groundClearance + 0.82, 0);
  bodyMeshGroup.add(roofSkin);

  // A-Pillars flanking windshield
  [-cabinWidth / 2 - 0.01, cabinWidth / 2 + 0.01].forEach((zOffset) => {
    const aPillarGeo = new THREE.BoxGeometry(0.55, 0.035, 0.05);
    const aPillar = new THREE.Mesh(aPillarGeo, rossoCorsa);
    aPillar.rotation.z = -0.58;
    aPillar.position.set(0.48, groundClearance + 0.65, zOffset);
    bodyMeshGroup.add(aPillar);

    // Aerodynamic Side Mirrors
    const mirrorStalkGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.08);
    const mirrorStalk = new THREE.Mesh(mirrorStalkGeo, satinBlackTrim);
    mirrorStalk.rotation.z = zOffset > 0 ? 0.5 : -0.5;
    mirrorStalk.position.set(0.44, groundClearance + 0.52, zOffset * 1.08);
    bodyMeshGroup.add(mirrorStalk);

    const mirrorCapGeo = new THREE.BoxGeometry(0.12, 0.06, 0.08);
    const mirrorCap = new THREE.Mesh(mirrorCapGeo, rossoCorsa);
    mirrorCap.position.set(0.44, groundClearance + 0.55, zOffset * 1.15);
    bodyMeshGroup.add(mirrorCap);

    // Reflective glass on mirror inner face
    const mirrorGlassGeo = new THREE.PlaneGeometry(0.1, 0.05);
    const mirrorGlass = new THREE.Mesh(mirrorGlassGeo, chromeMaterial);
    mirrorGlass.rotation.y = zOffset > 0 ? -Math.PI / 2 : Math.PI / 2;
    mirrorGlass.position.set(0.44, groundClearance + 0.55, zOffset * 1.15 - (zOffset > 0 ? 0.042 : -0.042));
    bodyMeshGroup.add(mirrorGlass);
  });

  // Cockpit Interior (visible through smoked glass)
  // 1) Dashboard & Steering Wheel
  const dashGeo = new THREE.BoxGeometry(0.35, 0.14, cabinWidth * 0.75);
  const dash = new THREE.Mesh(dashGeo, interiorDarkTrim);
  dash.position.set(0.46, groundClearance + 0.44, 0);
  bodyMeshGroup.add(dash);

  const steerColumnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12);
  const steerColumn = new THREE.Mesh(steerColumnGeo, satinBlackTrim);
  steerColumn.rotation.z = 0.65;
  steerColumn.position.set(0.38, groundClearance + 0.45, 0.24);
  bodyMeshGroup.add(steerColumn);

  const steerWheelGeo = new THREE.TorusGeometry(0.065, 0.012, 8, 24);
  const steerWheel = new THREE.Mesh(steerWheelGeo, satinBlackTrim);
  steerWheel.rotation.y = Math.PI / 2;
  steerWheel.rotation.x = -0.3;
  steerWheel.position.set(0.34, groundClearance + 0.49, 0.24);
  bodyMeshGroup.add(steerWheel);

  // 2) Distinctive Red F40 Kevlar Racing Bucket Seats with headrests
  [-0.24, 0.24].forEach((seatZ) => {
    const seatBaseGeo = new THREE.BoxGeometry(0.38, 0.08, 0.28);
    const seatBase = new THREE.Mesh(seatBaseGeo, interiorRedFabric);
    seatBase.position.set(0.08, groundClearance + 0.22, seatZ);
    bodyMeshGroup.add(seatBase);

    const seatBackGeo = new THREE.BoxGeometry(0.1, 0.38, 0.26);
    const seatBack = new THREE.Mesh(seatBackGeo, interiorRedFabric);
    seatBack.rotation.z = 0.22;
    seatBack.position.set(-0.1, groundClearance + 0.4, seatZ);
    bodyMeshGroup.add(seatBack);

    // Black harness shoulder straps
    [-0.06, 0.06].forEach((strapOffset) => {
      const strapGeo = new THREE.BoxGeometry(0.02, 0.36, 0.035);
      const strap = new THREE.Mesh(strapGeo, satinBlackTrim);
      strap.rotation.z = 0.22;
      strap.position.set(-0.08, groundClearance + 0.4, seatZ + strapOffset);
      bodyMeshGroup.add(strap);
    });
  });

  // 4. Rear Quarter Panels & Engine Bay
  const rearSectionLength = 1.45;
  const rearSectionWidth = carWidth;
  const rearSectionShape = new THREE.Shape();
  rearSectionShape.moveTo(-rearSectionLength / 2, 0);
  rearSectionShape.lineTo(rearSectionLength / 2, 0);
  rearSectionShape.lineTo(rearSectionLength / 2 - 0.1, 0.46);
  rearSectionShape.lineTo(-rearSectionLength / 2 + 0.08, 0.44);
  rearSectionShape.lineTo(-rearSectionLength / 2, 0.28);
  rearSectionShape.closePath();

  const rearExtrudeSettings = {
    steps: 2,
    depth: rearSectionWidth - 0.1,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 4
  };
  const rearGeo = new THREE.ExtrudeGeometry(rearSectionShape, rearExtrudeSettings);
  rearGeo.center();
  const rearMesh = new THREE.Mesh(rearGeo, rossoCorsa);
  rearMesh.rotation.y = Math.PI / 2;
  rearMesh.position.set(-1.05, groundClearance + 0.22, 0);
  rearMesh.castShadow = true;
  bodyMeshGroup.add(rearMesh);

  // Louvered Slats on Rear Lexan Engine Lid
  for (let i = 0; i < 5; i++) {
    const louverGeo = new THREE.BoxGeometry(0.04, 0.015, 0.72);
    const louver = new THREE.Mesh(louverGeo, satinBlackTrim);
    louver.position.set(-0.35 - i * 0.12, groundClearance + 0.72 - i * 0.05, 0);
    louver.rotation.z = 0.25;
    bodyMeshGroup.add(louver);
  }

  // Side Rocker Panels & Deep NACA Air Scoops
  [-carWidth / 2 - 0.02, carWidth / 2 + 0.02].forEach((zSide) => {
    // Lower rocker air channel
    const rockerGeo = new THREE.BoxGeometry(1.2, 0.08, 0.06);
    const rocker = new THREE.Mesh(rockerGeo, carbonSplitter);
    rocker.position.set(0.05, groundClearance + 0.06, zSide);
    bodyMeshGroup.add(rocker);

    // Rear brake duct scoop inlet
    const scoopGeo = new THREE.BoxGeometry(0.35, 0.16, 0.05);
    const scoop = new THREE.Mesh(scoopGeo, satinBlackTrim);
    scoop.position.set(-0.62, groundClearance + 0.22, zSide * 0.98);
    bodyMeshGroup.add(scoop);

    // Upper rear fender NACA duct
    const rearNacaGeo = new THREE.ConeGeometry(0.08, 0.22, 3);
    rearNacaGeo.rotateX(Math.PI / 2);
    const rearNaca = new THREE.Mesh(rearNacaGeo, satinBlackTrim);
    rearNaca.scale.set(1, 0.25, 1);
    rearNaca.position.set(-0.85, groundClearance + 0.52, zSide * 0.88);
    bodyMeshGroup.add(rearNaca);
  });

  // 5. The Iconic F40 Integrated High Rear Wing
  // Left and Right wing uprights (seamless extensions of the rear fenders)
  [-carWidth / 2 + 0.04, carWidth / 2 - 0.04].forEach((zSide) => {
    const uprightShape = new THREE.Shape();
    uprightShape.moveTo(0, 0);
    uprightShape.lineTo(0.38, 0);
    uprightShape.lineTo(0.34, 0.44);
    uprightShape.lineTo(0.04, 0.44);
    uprightShape.closePath();

    const uprightGeo = new THREE.ExtrudeGeometry(uprightShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2
    });
    uprightGeo.center();
    const upright = new THREE.Mesh(uprightGeo, rossoCorsa);
    upright.position.set(-1.62, groundClearance + 0.58, zSide);
    upright.castShadow = true;
    bodyMeshGroup.add(upright);
  });

  // Horizontal Aerofoil Wing Blade spanning full rear width
  const wingBladeGeo = new THREE.BoxGeometry(0.36, 0.045, carWidth + 0.06);
  const wingBlade = new THREE.Mesh(wingBladeGeo, rossoCorsa);
  wingBlade.position.set(-1.62, groundClearance + 0.78, 0);
  wingBlade.castShadow = true;
  bodyMeshGroup.add(wingBlade);

  // Gurney flap lip on rear of wing blade
  const gurneyGeo = new THREE.BoxGeometry(0.025, 0.03, carWidth + 0.04);
  const gurney = new THREE.Mesh(gurneyGeo, satinBlackTrim);
  gurney.position.set(-1.78, groundClearance + 0.81, 0);
  bodyMeshGroup.add(gurney);

  // 6. Rear End, Grille Mesh & Lighting
  // Perforated Black Rear Grille Panel
  const rearGrilleGeo = new THREE.BoxGeometry(0.04, 0.28, carWidth * 0.86);
  const rearGrille = new THREE.Mesh(rearGrilleGeo, satinBlackTrim);
  rearGrille.position.set(-1.86, groundClearance + 0.28, 0);
  bodyMeshGroup.add(rearGrille);

  // Circular Twin Ferrari Taillights on each side
  [-0.56, -0.42, 0.42, 0.56].forEach((zTaillight, idx) => {
    const isOuter = idx === 0 || idx === 3;
    // Chrome reflector cup
    const cupGeo = new THREE.CylinderGeometry(0.055, 0.05, 0.03, 16);
    cupGeo.rotateZ(Math.PI / 2);
    const cup = new THREE.Mesh(cupGeo, chromeMaterial);
    cup.position.set(-1.865, groundClearance + 0.32, zTaillight);
    bodyMeshGroup.add(cup);

    // Colored round lens
    const lensGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.025, 16);
    lensGeo.rotateZ(Math.PI / 2);
    const lens = new THREE.Mesh(lensGeo, isOuter ? taillightAmberGlass : taillightRedGlass);
    lens.position.set(-1.875, groundClearance + 0.32, zTaillight);
    bodyMeshGroup.add(lens);
  });

  // Center Triple Exhaust Outlets (Iconic F40 setup: 2 main exhausts + 1 central turbo wastegate pipe)
  [-0.07, 0, 0.07].forEach((zPipe, i) => {
    const radius = i === 1 ? 0.032 : 0.04;
    const pipeGeo = new THREE.CylinderGeometry(radius, radius, 0.12, 16);
    pipeGeo.rotateZ(Math.PI / 2);
    const pipe = new THREE.Mesh(pipeGeo, chromeMaterial);
    pipe.position.set(-1.86, groundClearance + 0.14, zPipe);
    bodyMeshGroup.add(pipe);

    // Dark hollow inside of pipe
    const innerGeo = new THREE.CylinderGeometry(radius * 0.78, radius * 0.78, 0.125, 16);
    innerGeo.rotateZ(Math.PI / 2);
    const inner = new THREE.Mesh(innerGeo, satinBlackTrim);
    inner.position.set(-1.865, groundClearance + 0.14, zPipe);
    bodyMeshGroup.add(inner);
  });

  // Lower Rear Diffuser Aerodynamic Vanes
  [-0.32, -0.16, 0.16, 0.32].forEach((zVane) => {
    const vaneGeo = new THREE.BoxGeometry(0.38, 0.08, 0.015);
    const vane = new THREE.Mesh(vaneGeo, carbonSplitter);
    vane.position.set(-1.68, groundClearance + 0.07, zVane);
    bodyMeshGroup.add(vane);
  });

  car.add(bodyMeshGroup);

  // 7. Authentic 1:64 Scale Speedline 5-Spoke Star Alloy Wheels & Rubber Tires
  function createSpeedlineWheel(isRear = false) {
    const wheelGroup = new THREE.Group();

    const outerRadius = 0.31;
    const rimRadius = 0.22;
    const tireWidth = isRear ? 0.28 : 0.22;
    const rimWidth = isRear ? 0.24 : 0.18;

    // A) Low Profile Rubber Tire with Tread & Chamfered Sidewalls
    const tireGeo = new THREE.CylinderGeometry(outerRadius, outerRadius, tireWidth, 32);
    tireGeo.rotateX(Math.PI / 2);
    const tire = new THREE.Mesh(tireGeo, tireRubberMaterial);
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Tread grooved channels
    const treadRingGeo = new THREE.TorusGeometry(outerRadius * 0.99, 0.008, 8, 32);
    const treadRing = new THREE.Mesh(treadRingGeo, satinBlackTrim);
    wheelGroup.add(treadRing);

    // B) Stepped Deep-Lip Alloy Rim
    const rimGeo = new THREE.CylinderGeometry(rimRadius, rimRadius, rimWidth, 32, 1, true);
    rimGeo.rotateX(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, silverWheelMaterial);
    wheelGroup.add(rim);

    // Deep polished outer rim lip
    const lipGeo = new THREE.RingGeometry(rimRadius * 0.72, rimRadius, 32);
    const lip = new THREE.Mesh(lipGeo, chromeMaterial);
    lip.position.z = rimWidth / 2 + 0.002;
    wheelGroup.add(lip);

    // C) Iconic 5-Spoke Star Design
    const spokeGroup = new THREE.Group();
    const numSpokes = 5;
    for (let s = 0; s < numSpokes; s++) {
      const angle = (s * 2 * Math.PI) / numSpokes;
      const spokeGeo = new THREE.BoxGeometry(0.045, rimRadius * 0.78, 0.025);
      const spoke = new THREE.Mesh(spokeGeo, silverWheelMaterial);
      spoke.position.y = (rimRadius * 0.78) / 2;
      spoke.position.z = rimWidth / 2 - 0.012;

      const singleSpokeHolder = new THREE.Group();
      singleSpokeHolder.rotation.z = angle;
      singleSpokeHolder.add(spoke);
      spokeGroup.add(singleSpokeHolder);
    }
    wheelGroup.add(spokeGroup);

    // Center lock hub nut & Ferrari yellow emblem center cap
    const hubNutGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.035, 6);
    hubNutGeo.rotateX(Math.PI / 2);
    const hubNut = new THREE.Mesh(hubNutGeo, chromeMaterial);
    hubNut.position.z = rimWidth / 2 + 0.008;
    wheelGroup.add(hubNut);

    const centerCapGeo = new THREE.CircleGeometry(0.026, 16);
    const centerCap = new THREE.Mesh(centerCapGeo, badgeMat);
    centerCap.position.z = rimWidth / 2 + 0.026;
    wheelGroup.add(centerCap);

    // D) Drilled Brake Rotor & Rosso Red Brake Caliper
    const rotorGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24);
    rotorGeo.rotateX(Math.PI / 2);
    const rotor = new THREE.Mesh(rotorGeo, brakeRotorMaterial);
    rotor.position.z = 0;
    wheelGroup.add(rotor);

    const caliperGeo = new THREE.BoxGeometry(0.08, 0.06, 0.035);
    const caliper = new THREE.Mesh(caliperGeo, brakeCaliperMaterial);
    caliper.position.set(0.11, 0.08, 0.015);
    wheelGroup.add(caliper);

    return wheelGroup;
  }

  // Position the 4 wheels with authentic staggered track width and wheelbase
  const frontTrackZ = carWidth / 2 - 0.05;
  const rearTrackZ = carWidth / 2 - 0.02; // Wider rear track for F40 stance
  const wheelRadius = 0.31;
  const wheelPosY = groundClearance + wheelRadius;
  const frontPosX = 1.05;
  const rearPosX = -1.1;

  // Front Left
  const flWheel = createSpeedlineWheel(false);
  flWheel.position.set(frontPosX, wheelPosY, frontTrackZ);
  car.add(flWheel);

  // Front Right
  const frWheel = createSpeedlineWheel(false);
  frWheel.rotation.y = Math.PI;
  frWheel.position.set(frontPosX, wheelPosY, -frontTrackZ);
  car.add(frWheel);

  // Rear Left (Wider rim & tire)
  const rlWheel = createSpeedlineWheel(true);
  rlWheel.position.set(rearPosX, wheelPosY, rearTrackZ);
  car.add(rlWheel);

  // Rear Right (Wider rim & tire)
  const rrWheel = createSpeedlineWheel(true);
  rrWheel.rotation.y = Math.PI;
  rrWheel.position.set(rearPosX, wheelPosY, -rearTrackZ);
  car.add(rrWheel);

  return car;
}

// Export the generated model to binary GLB format
const exporter = new GLTFExporter();
const carModel = createFerrariF40Model();

exporter.parse(
  carModel,
  (gltf) => {
    const buffer = Buffer.from(gltf);
    const targetDir1 = path.resolve('public/models');
    const targetDir2 = path.resolve('src/public/models');

    if (!fs.existsSync(targetDir1)) fs.mkdirSync(targetDir1, { recursive: true });
    if (!fs.existsSync(targetDir2)) fs.mkdirSync(targetDir2, { recursive: true });

    const file1 = path.join(targetDir1, 'f40-diecast.glb');
    const file2 = path.join(targetDir2, 'f40-diecast.glb');

    fs.writeFileSync(file1, buffer);
    fs.writeFileSync(file2, buffer);

    console.log(`GLB model created successfully at:\n- ${file1} (${buffer.length} bytes)\n- ${file2}`);
  },
  (err) => {
    console.error('Error exporting GLB:', err);
    process.exit(1);
  },
  { binary: true }
);
