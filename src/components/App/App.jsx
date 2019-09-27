import React, { Component } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import { Scene } from 'three'

const AppWrapper = styled.div`
    
`

export default class App extends Component {

    /**
     ******************************* COMPONENTDIDMOUNT *******************************
     */
    componentDidMount() {
        // this.renderCubes()
        // this.renderSphere()
        this.renderLines()
    }

    firstObject = () => {
        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        let renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
        var animate = function () {
          requestAnimationFrame( animate );
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render( scene, camera );
        };
        animate();
    }

    renderCubes = () => {
        let scene, camera, renderer, cube1, cube2, plane
        let ADD = 0.02

        let createGeometry = function() {
            let geometery = new THREE.BoxGeometry(5, 5, 5)
            let material = new THREE.MeshBasicMaterial({ color: 0xc9b92b })

            cube1 = new THREE.Mesh(geometery, material)
            cube1.position.z = -6
            cube1.position.y = -5

            geometery = new THREE.BoxGeometry(5, 5, 5)
            material = new THREE.MeshBasicMaterial({ 
                color: 0Xff0040,
                transparent: true,
                opacity: 0.8 
            })
            
            cube2 = new THREE.Mesh(geometery, material)
            cube2.position.z = 6
            cube2.position.y = -5

            geometery = new THREE.PlaneGeometry(1000, 1000, 50, 50)
            material = new THREE.MeshBasicMaterial({ color: 0Xa6f995, wireframe: true })

            plane = new THREE.Mesh(geometery, material)
            plane.rotation.x = Math.PI / 2
            plane.position.y = -100

            scene.add(cube1)
            scene.add(cube2)
            scene.add(plane)
        }

        let init = () => {
            // Create the scene
            scene = new THREE.Scene()
            scene.background = new THREE.Color(0xffffff)

            // Create the camera location
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
            camera.position.z = 20

            createGeometry()

            // Create the renderer
            renderer = new THREE.WebGLRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight)
            document.body.appendChild(renderer.domElement)
        }

        let mainLoop = function() {
            cube1.position.x += ADD
            cube2.position.x -= ADD

            if (cube1.position.x > 6 || cube1.position.x < -6) {
                ADD *= -1
            }

            renderer.render(scene, camera)
            requestAnimationFrame(mainLoop)
        }

        init()
        mainLoop()
    }

    renderSphere() {
        let scene, camera, renderer, cube, normals, sphere, torus
        let ADD = 0.02

        let createGeometry = () => {
            let geometry = new THREE.SphereGeometry(5, 30, 30)

            // let material = new THREE.MeshBasicMaterial({
            //     color: 0xbbbbbb,
            //     // wireframe: true
            // })

            let material = new THREE.MeshNormalMaterial()

            sphere = new THREE.Mesh(geometry, material)

            // second paramter is the size
            normals = new THREE.FaceNormalsHelper(sphere, 2, 0x00ff00, 1)

            scene.add(sphere)
            scene.add(normals)
        }

        let init = () => {
            scene = new THREE.Scene()
            scene.background = new THREE.Color(0xffffff)

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)            
            camera.position.z = 20

            createGeometry()

            renderer = new THREE.WebGLRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight)

            document.body.appendChild(renderer.domElement)
        }

        let mainLoop = () => {
            sphere.rotation.y += ADD
            normals.update()

            renderer.render(scene, camera)
            requestAnimationFrame(mainLoop)
        }

        init()
        mainLoop()
    }

    renderLines() {
        let scene, camera, renderer, cylinder, sphere
        let ADD = 0.02

        const createGeometry = () => {
            let material = new THREE.LineBasicMaterial({ 
                color: 0xffffff,
                linewidth: 1 
            })

            let geometry = new THREE.CylinderGeometry(3, 2, 4)

            cylinder = new THREE.Line(geometry, material)
            cylinder.position.z = -10
            cylinder.position.x = -5

            geometry = new THREE.SphereGeometry(3, 30, 30)
            sphere = new THREE.Line(geometry, material)

            sphere.position.z = 0
            sphere.position.x = 5

            scene.add(cylinder)
            scene.add(sphere)
        }

        const init = () => {
            scene = new THREE.Scene()
            scene.background = new THREE.Color(0xffffff)

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)            
            camera.position.z = 20

            const light = new THREE.AmbientLight(0xffffff, 0.5)
            scene.add(light)

            const light2 = new THREE.PointLight(0xffffff, 0.5)
            scene.add(light2)

            createGeometry()

            renderer = new THREE.WebGLRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight)

            document.body.appendChild(renderer.domElement)
        }

        const mainLoop = () => {
            cylinder.rotation.x += ADD
            sphere.rotation.x += ADD
            
            cylinder.rotation.y += ADD
            sphere.rotation.y += ADD

            renderer.render(scene, camera)
            requestAnimationFrame(mainLoop)
        }

        init()
        mainLoop()
    }

    render() {

        

        return (
            <AppWrapper 
                className="App"
                // ref={element => this.threeRootElement = element}
            >
            </AppWrapper>
        )
    }
}