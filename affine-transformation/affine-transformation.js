// Initialize Paper.js with the canvas elements
var originalCanvas = document.getElementById('original');
var transformedCanvas = document.getElementById('transformed');
paper.setup(originalCanvas);
var transformedPaper = new paper.PaperScope();
transformedPaper.setup(transformedCanvas);

// Define the points you want to transfor
const point_spacing = 10; // The amount of space between the points
const radius = 5;
const size = 9;
const x_offset = 0;
const y_offset = 0;
var circles = [];

var colors = [
    '#f77189',
    '#dc8932',
    '#ae9d31',
    '#77ab31',
    '#33b07a',
    '#36ada4',
    '#38a9c5',
    '#6e9bf4',
    '#cc7af4',
    '#f565cc'
]

for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
        var circle = new paper.Path.Circle({
            center: new paper.Point(x * point_spacing + x_offset, y * point_spacing + y_offset),
            radius: radius,
            fillColor: colors[x],
            parent: paper.project.activeLayer
        });
        circles.push(circle);
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
    var transformedPoints = circles.map(function (point) {

        var newPoint = math.multiply(affine_matrix, math.matrix([[point.position.x], [point.position.y], [1]]));

        return new paper.Path.Circle({
            center: new paper.Point(newPoint._data[0][0], newPoint._data[1][0]),
            radius: radius,
            fillColor: point.fillColor,
            parent: transformedPaper.project.activeLayer
        });
    })

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