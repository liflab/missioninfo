function initBlockly(initZoom,loadSauv,loadWorkspace) {
    Blockly.inject(document.body, {
        toolbox: document.getElementById('toolbox'),
        zoom: {
            controls: true,
            startScale: initZoom,
            maxScale: initZoom * (1.0 + (1/3)),
            minScale: initZoom / (1.0 + (1/3)),
            scaleSpeed: 1.0 + (1/3)
        },
        trashcan: true,
        scrollbars: true
    });

    var url = window.location.href.split('#')[0];
    if ('localStorage' in window && window.localStorage[url]) {
        if (loadSauv) {
            // Restore previous blocks
            window.setTimeout(Blockly.Storage.restoreBlocks, 500);
        }
    }
    else {
        if (loadWorkspace) {
            // Load workspace
            Blockly.Xml.domToWorkspace(document.getElementById('workspace'), Blockly.getMainWorkspace());
        }
    }

    // Let the top-level application know that Blockly is ready.
    try {
        window.parent.blockly_loaded(Blockly);
    }
    catch (err) {
        console.log("Launch without parent page")
    }
}