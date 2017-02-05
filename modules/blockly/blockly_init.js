function initBlockly(initZoom,loadSauv,loadWorkspace) {
    Blockly.inject(document.body, {
        toolbox: document.getElementById('toolbox'),
        zoom: {
            controls: true,
            startScale: initZoom,
            maxScale: 5,
            minScale: 1.0,
            scaleSpeed: 1.2
        },
        trashcan: true,
        scrollbars: true
    });

    if(loadSauv) {
        // Restore previous blocks
        window.setTimeout(Blockly.Storage.restoreBlocks, 500);
    }

    if (loadWorkspace) {
        // Load workspace
        Blockly.Xml.domToWorkspace(document.getElementById('workspace'), Blockly.getMainWorkspace());
    }

    // Let the top-level application know that Blockly is ready.
    try {
        window.parent.blockly_loaded(Blockly);
    }
    catch (err) {
        console.log("Launch without parent page")
    }
}