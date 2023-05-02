// Initialize Paper.js with the canvas elements
var originalCanvas = document.getElementById('original');
var transformedCanvas = document.getElementById('transformed');
paper.setup(originalCanvas);
var transformedPaper = new paper.PaperScope();
transformedPaper.setup(transformedCanvas);

// Define the points you want to transfor
var point_spacing = 10; // The amount of space between the points
var points = [];
var size = 20;
for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
        // Create a new point at the current position
        var point = new paper.Point(x * point_spacing, y * point_spacing);
        points.push(point);
    }
}

// Get the input elements for the matrix
var aInput = document.getElementById('a');
var bInput = document.getElementById('b');
var cInput = document.getElementById('c');
var dInput = document.getElementById('d');
var eInput = document.getElementById('e');
var fInput = document.getElementById('f');

function matrixUpdate() {
    //cleanup canvas
    transformedPaper.project.activeLayer.removeChildren()
    transformedPaper.view.draw();


    var a = aInput.value;
    var b = bInput.value;
    var c = cInput.value;
    var d = dInput.value;
    var e = eInput.value;
    var f = fInput.value;

    var affine_matrix = math.matrix([
        [a, b, c],
        [d, e, f],
        [0, 0, 1]
    ])

    document.getElementById('matrix').innerHTML = katex.renderToString(
        '\\begin{pmatrix}'
        + a + ' & ' + b + ' & ' + c + ' \\\\ '
        + d + ' & ' + e + ' & ' + f + ' \\\\ '
        + 0 + ' & ' + 0 + ' & ' + 1 + ' \\\\ '
        + '\\end{pmatrix}'
    );

    // Apply the affine-transformation matrix to the points
    var transformedPoints = points.map(function (point) {
        var newPoint = math.multiply(affine_matrix, math.matrix([[point.x], [point.y], [1]]));
        return new paper.Point(newPoint._data[0][0], newPoint._data[1][0]);
    });

    // Make the thingis that will be painted
    var circles1 = points.map(function (point) {
        return new paper.Path.Circle({
            center: point,
            radius: 2,
            fillColor: 'black',
            parent: paper.project.activeLayer
        });
    });
    var circles2 = transformedPoints.map(function (point) {
        return new transformedPaper.Path.Circle({
            center: point,
            radius: 2,
            fillColor: 'black',
            parent: transformedPaper.project.activeLayer
        });
    });

    // Draw the paths on the canvas
    paper.view.draw();
    transformedPaper.view.draw();
}

aInput.addEventListener('input', matrixUpdate)
bInput.addEventListener('input', matrixUpdate)
cInput.addEventListener('input', matrixUpdate)
dInput.addEventListener('input', matrixUpdate)
eInput.addEventListener('input', matrixUpdate)
fInput.addEventListener('input', matrixUpdate)

matrixUpdate();