/////////////////////////////////////////////////////////////////////////////////////////////////////////
//create the scanning transposed matrix
function MatrixTransform(dstCorners) {
  // grid pixels size from settings
  var gridCols = cityIOdataStruct.header.spatial.ncols * 4;
  var gridRows = cityIOdataStruct.header.spatial.nrows * 4;

  //matrix Grid Location Array
  var matrixGridLocArray = [];
  // return a new visual Grid Locations Array
  let vizGridLocArray = scanArrayMaker(gridCols, gridRows);

  //set the reference points of the 4 edges of the canvas
  // to get 100% of the image/video in canvas
  //before distorting
  srcCorners = [
    getPos(camCanvas)[0],
    getPos(camCanvas)[1],
    camCanvas.width,
    getPos(camCanvas)[1],
    getPos(camCanvas)[0],
    camCanvas.height,
    camCanvas.width,
    camCanvas.height
  ];
  //method to get div position
  function getPos(el) {
    // yay readability
    for (
      var lx = 0, ly = 0;
      el != null;
      lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent
    );
    return [lx, ly];
  }
  //var for the distorted points
  let dstPt;
  // use perspT lib to calculate transform matrix
  //and store the results of the 4 points dist. in var perspT
  let perspT;
  perspT = PerspT(srcCorners, dstCorners);

  svgPntsArray = [];
  //distort each dot in the matrix to locations and make cubes
  for (let j = 0; j < vizGridLocArray.length; j++) {
    dstPt = perspT.transform(vizGridLocArray[j][0], vizGridLocArray[j][1]);
    //create visuals points on canvas for ref and add to array
    svgPntsArray.push(
      svgKeystone.appendChild(svgCircle(dstPt, "red", 1, 1, "#42adf4", 0.25))
    );
    //Optional: show text for each pixel
    // svgKeystone.appendChild(svgText(dstPt, j, 8));
    //push these locs to an array for scanning
    matrixGridLocArray.push([Math.floor(dstPt[0]), Math.floor(dstPt[1])]);
  }
  //send points to Color Scanner fn.
  ColorPicker(matrixGridLocArray);
  dstCorners = [];
  //info
  infoDiv(
    "table size: " +
      cityIOdataStruct.header.spatial.ncols +
      " x " +
      cityIOdataStruct.header.spatial.ncols
  );
  infoDiv("Matrix Transformed 4 corners are at: " + dstCorners);
}
