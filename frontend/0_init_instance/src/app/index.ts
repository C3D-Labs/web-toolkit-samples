import "../styles/index.css"

// import c3d viewer
import c3dviewer = require("@c3dlabs/c3dviewer-api")

export class Application 
{
    public run(){
        const HTMLElementId ="graphicsView"

        // 1. load an instance settings
        this.loadViewerSettings()
        // 2. Initialize the C3D engine instance
        .then(settings=>{
            return c3dviewer.createC3DViewer(settings)
        })
        // 3. load 3d view settings
        .then(instance=>{
            console.log("C3D engine instance is created")
            this._instance = instance

            return this.loadViewSettings()
        })
        // 4. Initialize the 3d graphics view
        .then(settings=>{
            return this._instance?.createView(HTMLElementId, settings, {})
        })
        .then(view=>{
            console.log("3D view is created, uuid:", view?.uuid)
            this._view = view
        })
        .catch(error=>{
            console.log(error)
        })
    }

    /**
     * loads settings to init instance of c3d engine
     * @returns c3d viewer settings
     */
    private loadViewerSettings():Promise<c3dviewer.ViewerSettings>{
        return new Promise<c3dviewer.ViewerSettings>((resolve)=>{
            resolve(
                {
                    c3dService:{
                        // host where c3dservice running
                        host: window.location.protocol+ "//" +window.location.hostname,
                        // port which c3dservice listening
                        port: "12345"
                    }
                }
            )
        })
    }

    /**
     * loads graphics view settings of model
     * @returns graphics view settings
     */
    private loadViewSettings():Promise<c3dviewer.ModelViewSettings>{
        return new Promise<c3dviewer.ModelViewSettings>((resolve)=>{
            resolve({
                environment:{
                    background:{
                        brush:"LinearGradient",
                        color_1:{
                            "R":255,
                            "G":255,
                            "B":255
                        },
                        color_2:{
                            "R":200,
                            "G":235,
                            "B":255
                        }
                    }
                }
            })
        })
    }

    private _instance?: c3dviewer.C3DViewer
    private _view?: c3dviewer.C3DModelView
}


var app = new Application()
app.run()