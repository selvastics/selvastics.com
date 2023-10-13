
# How to provide direct feedback on survey results for your participants
**Author**: [Clievins Selva](https://github.com/selvastics)  
**Date**: October 12, 2023  
**License**: CC BY 4.0

## Abstract
This article outlines the implementation of graphical feedback for participants using SoSci Survey. By leveraging HTML, CSS, and JavaScript, the survey conductor can display individual feedback for each participant, enhancing engagement and improving data quality. Two chart types, a bar plot and a radar plot, are discussed in detail. Additionally, a downloadable PDF feature that complies with the General Data Protection Regulation is also presented. For direct usage, a practical example is provided for implementing the Big Five Inventory.


## 1 Foundational concepts and theoretical guidelines
SoSci Survey is an online tool frequently used in academic research for creating surveys. It offers various features, including question branching, randomization, and multilingual support (SoSci Survey, n.d.). Beyond these functionalities, its capacity to integrate HTML, CSS, and JavaScript allows for the visualization of individual results for participants. This opens up the possibility of immediate feedback, a cornerstone of the learning process that has been studied extensively across fields like psychology, education, and human-computer interaction. Immediate feedback, anchored in constructivist learning theory, enhances the learning experience by allowing for the correction of errors and reinforcement of understanding. In the realm of online surveys, this can significantly augment participant engagement, thereby improving data quality and validity.

However, the challenge often lies in reconciling the desire for immediate feedback with the need for participant anonymity and data protection, especially in the European context governed by the General Data Protection Regulation (GDPR). GDPR imposes stringent requirements on data collection and processing, advocating for data minimization and privacy by design (SoSci Survey, n.d.). These principles recommend that data should be processed locally on the client-side whenever possible. In the context of online surveys, this translates to enabling participants to download their results directly without the need for collecting personal identifiers like email addresses, thus adhering to GDPR guidelines.

The choice of how to visually represent this immediate feedback is another critical consideration. While various chart types exist, this article focuses on bar plots and radar plots. Bar plots are particularly effective for straightforward comparisons of individual data points across categories, making them easily interpretable by participants. Radar plots, in contrast, are more suitable for representing multivariate data, allowing for the assessment of multiple variables at once. This makes them ideal for more complex data interpretations, such as presenting a participant's personality profile in the context of the Big Five Inventory (BFI). 

However, the principles and techniques discussed here can be adapted to numerous other types of charts. The [r-graph Gallery ](https://r-graph-gallery.com/index.html) provides numerous examples of how data can be plotted, offering a valuable resource for researchers looking to implement suiting graphical elements specific to their variables of interest. By combining the capabilities of SoSci Survey with GDPR-compliant methods and carefully selected chart types, researchers can offer participants immediate, meaningful, and secure feedback, thereby enriching the survey experience and potentially elevating the quality of the data collected. 

## 2 Technical Implementation 

### Prerequisites
To execute the code samples in this article, I assume that you have an operational SoSci Survey project and are familiar with HTML, CSS, and JavaScript. For those not acquainted with these web technologies, I recommend importing the provided `.xml` file into SoSci Survey as a starting point for building your study.



In the code, `%variable1%` and `%variable2%` act as placeholders; they will be replaced with the actual scores obtained from the survey participants. Likewise, `var_01` to `var_12` should be replaced with the specific variables you intend to use in your project. Note that the ensuing code examples serve as foundational templates for creating the chart. 

### 2.1 Calculation of participant indices
In the PHP code section, I calculate two indices,`variable1` and `variable2`, by taking the mean of six distinct variables each. These calculated means are then formatted to one decimal place and are intended to be used in a chart. The code relies on a built-in function `valueMean()` to compute the average values.

1. **Calculating mean**: 
For the first variable I use `var_01` to `var_06` and I use `var_07` to `var_12` to calculate `variable2`.
    ```php
    $variable1= valueMean(array('var_01', 'var_02', 'var_03', 'var_04', 'var_05', 'var_06'));
    $variable2= valueMean(array('var_07', 'var_08', 'var_09', 'var_10', 'var_11', 'var_12'));
    ```

2. **Debugging**: The `debug($variable1)` and `debug($variable2)` lines are for debugging purposes, presumably printing the calculated mean values to the log. 

    ```php
    debug($variable1);
    debug($variable2);
    ```

3. **String formatting and replacement**: The `sprintf('%1.1f', $variable1)` and `sprintf('%1.1f', $variable2)` lines format the mean values to one decimal place. These formatted values replace `%variable1%` and `%variable2%`, which are placeholders likely used in a subsequent chart or report.
    ```php
    replace('%variable1%', sprintf('%1.1f', $variable1));
    replace('%variable2%', sprintf('%1.1f', $variable2));
    ```

### 2.2 Bar plot: Code explanation
 The code provided is an HTML/JavaScript snippet that uses the Chart.js library to render a bar chart. I compare `variable1` and `variable2` in this example.  The chart is customized with specific colors for the background and border, as well as border width. The Y-axis scale is set to range between 1 and 7. This explanation will dissect the code, focusing on key elements like the data structure, aesthetic properties, and configuration options.

1. **Including Chart.js**: The Chart.js library is included via a script tag, which is essential for rendering the chart.
    ```html
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    ```

2. **Canvas element**: A canvas element with the id `barChart` is created. This is where the chart will be rendered.
    ```html
    <canvas id="barChart"></canvas>
    ```

3. **JavaScript code**: The main JavaScript code does the following:

    - **Context retrieval**: The context of the canvas is obtained using 
    ```javascript
    var ctx = document.getElementById('barChart').getContext('2d');
    ```

    - **Data and aesthetics**: The `data` object contains labels (`variable1` and `variable2`) and datasets. The datasets have data points, background color, border color, and border width.
    ```javascript
    data: {
      labels: ['variable1', 'variable2'],
      datasets: [{
        data: ['%variable1%', '%variable2%'],
        backgroundColor: 'rgba(178, 24, 43, 0.2)',
        borderColor: 'rgba(178, 24, 43, 1)',
        borderWidth: 1.5
      }]
    }
    ```

    - **Options**: One can set additional options like scales and plugins. Here, the Y-axis is limited to values between 1 and 7, and the legend is hidden.
    ```javascript
    options: {
      scales: {
        y: {
          min: 1,
          max: 7
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
    ```

### Further customization: Fine tuning
One can further customize the `backgroundColor`, `borderColor`, and `borderWidth` by changing their respective values in the dataset object. For more colors, use any valid CSS color specification like hex, RGB, or RGBA values. One can also include error bars (represented as Standard deviation, Standard error or Confidence Interval). 

### 2.3 Radar plot: Code explanation
Similar to the previous chart, this code snippet implements the Chart.js library. It creates a radar chart with two labels: `Label1` and `Label2`, and uses two variables (`%Variable1%` and `%Variable2%`) for plotting. 

1. **Canvas element**: Again, a canvas element with the id `radarChart` is defined. This serves as the rendering area for the radar chart.
    ```html
    <canvas id="radarChart"></canvas>
    ```

2. **JavaScript context**: The 2D rendering context of the canvas element is obtained, allowing drawing operations.
    ```javascript
    var ctx = document.getElementById('radarChart').getContext('2d');
    ```

3. **JavaScript context**: A new Chart object is instantiated with the type set to `radar`. The data object contains labels and datasets, where `%Variable1%` and `%Variable2%` are placeholders that would be replaced by actual values.
    ```javascript
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Label1', 'Label2'],
        datasets: [{
          data: ['%Variable1%', '%Variable2%']
        }]
      }
    });
    ```

### Further customization: norm scores
Norm scores can be particularly useful for helping participants interpret their results. These are represented as an additional datasets on the radar chart, allowing for direct comparison between individual and normative data. Adaptations for other types of plots can be made in a similar fashion. An applied example using the Big Five Inventory is provided later in the article.



### 2.4 Providing a downloadable PDF
The provided HTML and JavaScript code snippet demonstrates the use of `jsPDF` and `html2canvas` libraries to enable a client-side PDF download of a rendered chart. A button is provided, and upon clicking it, the canvas containing the chart is converted to an image, which is then embedded into a PDF file. This explanation will discuss the inclusion of the required libraries, the button's functionality, and the JavaScript logic for converting the canvas to a PDF.

1. **Library inclusion**: The `jsPDF` and `html2canvas` libraries are included to facilitate PDF creation and canvas-to-image conversion, respectively.
    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    ```

2. **Download button**: A simple HTML button with the id `downloadPdf` is added, which will trigger the PDF download when clicked.
    ```html
    <button id="downloadPdf">Download PDF</button>
    ```

3. **JavaScript logic**: An event listener is attached to the button, and upon clicking, it performs the following operations:
    - Calls `html2canvas` to convert the canvas element to a PNG image.
    - Initializes a new `jsPDF` object.
    - Adds the image to the PDF.
    - Saves the PDF with the filename `download.pdf`.
    ```javascript
    document.getElementById('downloadPdf').addEventListener('click', function() {
      html2canvas(document.getElementById('barChart'), {
        onrendered: function(canvas) {
          var imgData = canvas.toDataURL('image/png');
          var pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 10, 10);
          pdf.save('download.pdf');
        }
      });
    });
    ```

## 3 Practical example: Big Five Inventory for personality assessment 
The BFI is a widely recognized instrument for assessing five key dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. For the purposes of this guide, I will focus on implementing the BFI based on the work of Rammstedt and colleagues (2018). This practical example demonstrates how participants can receive a PDF download after responding to BFI items on SoSci Survey.

To implement the BFI in SoSci Survey, create a new questionnaire and add the BFI items as questions. Make sure to name the variables according to the following naming convention, as I will use these variable names in this code:

- Openness: `Offenheit`
- Conscientiousness: `Gewissenhaftigkeit`
- Extraversion: `Extraversion`
- Agreeableness: `Vertraeglichkeit`
- Neuroticism: `Neurotizismus`

The code assumes that there is a question category BF01 with individual item 1 to item 30, previous to the code implementation.

As item 1,3,7,8,10,14,17,19,20,21,24,26,27,28 and 30 are reversed, we can either set these items as reversed items within sosci, or calculate the reversed score using the `value()` function to fetch the respondent's original score and then use the `put()` function to save the recalculated score into an internal variable. See the [SoSci Survey Guide](https://www.soscisurvey.de/help/doku.php/en:create:questions:scale#inverting_items) for detailed instructions for in-php reversing. 
In the following php code chunck, I calculate means for items that are reversed within sosci survey.
```php
// Wert/Ergebnis ermitteln
// Neurotizsmus
$Neurotizismus= valueMean(array(
'BF01_04', 
'BF01_09', 
'BF01_14', 
'BF01_19', 
'BF01_24', 
'BF01_29' 
));
debug($Neurotizismus);

// Extraversion
$Extraversion= valueMean(array(
'BF01_01', 
'BF01_06', 
'BF01_11', 
'BF01_16', 
'BF01_21', 
'BF01_26'
));
debug($Extraversion);

// Offenheit
$Offenheit= valueMean(array(
'BF01_05', 
'BF01_10', 
'BF01_15', 
'BF01_20', 
'BF01_25', 
'BF01_30' 
));
debug($Offenheit);

// Vertraeglichkeit
$Vertraeglichkeit= valueMean(array(
'BF01_02', 
'BF01_07', 
'BF01_12', 
'BF01_17', 
'BF01_22', 
'BF01_27'  
));
debug($Vertraeglichkeit);

// Gewissenhaftigkeit
$Gewissenhaftigkeit= valueMean(array(
'BF01_03', 
'BF01_08', 
'BF01_13', 
'BF01_18', 
'BF01_23', 
'BF01_28'  
));
debug($Gewissenhaftigkeit);

replace('%Neurotizismus%', sprintf('%1.1f', $Neurotizismus));
replace('%Extraversion%', sprintf('%1.1f', $Extraversion));
replace('%Offenheit%', sprintf('%1.1f', $Offenheit));
replace('%Vertraeglichkeit%', sprintf('%1.1f', $Vertraeglichkeit));
replace('%Gewissenhaftigkeit%', sprintf('%1.1f', $Gewissenhaftigkeit));


$facetten = array('Neurotizismus', 'Extraversion', 'Offenheit', 'Vertraeglichkeit', 'Gewissenhaftigkeit');
```


A limitation of the initial approach is that it presumes all participants provide valid responses to every item. However, one may wish to compute indices conditionally, for instance, only when all responses are present and valid. This alternative strategy sets an index to 0 if any of the items used to calculate the mean have an invalid response. An example demonstrating this approach is provided below, in which an invalid response is defined as a value less than or equal to 0.

```php
// Neurotizismus
$nitems = array(value('BF01_04'), value('BF01_09'), value('BF01_14'), value('BF01_19'), value('BF01_24'), value('BF01_29'));
$isValid = true;
$sum = 0;
foreach ($nitems as $value) {
    if ($value <= 0) {
        $isValid = false;
        break;
    }
    $sum += $value;
}
if ($isValid) {
    $Neurotizismus = $sum / count($nitems);
} else {
    $Neurotizismus = 0;
}
debug($Neurotizismus);

// Extraversion
$eitems = array(value('BF01_01'), value('BF01_06'), value('BF01_11'), value('BF01_16'), value('BF01_21'), value('BF01_26'));
$isValid = true;
$sum = 0;
foreach ($eitems as $value) {
    if ($value <= 0) {
        $isValid = false;
        break;
    }
    $sum += $value;
}
if ($isValid) {
    $Extraversion = $sum / count($eitems);
} else {
    $Extraversion = 0;
}
debug($Extraversion);

// Offenheit
$oitems = array(value('BF01_05'), value('BF01_10'), value('BF01_15'), value('BF01_20'), value('BF01_25'), value('BF01_30'));
$isValid = true;
$sum = 0;
foreach ($oitems as $value) {
    if ($value <= 0) {
        $isValid = false;
        break;
    }
    $sum += $value;
}
if ($isValid) {
    $Offenheit = $sum / count($oitems);
} else {
    $Offenheit = 0;
}
debug($Offenheit);

// Vertraeglichkeit
$vitems = array(value('BF01_02'), value('BF01_07'), value('BF01_12'), value('BF01_17'), value('BF01_22'), value('BF01_27'));
$isValid = true;
$sum = 0;
foreach ($vitems as $value) {
    if ($value <= 0) {
        $isValid = false;
        break;
    }
    $sum += $value;
}
if ($isValid) {
    $Vertraeglichkeit = $sum / count($vitems);
} else {
    $Vertraeglichkeit = 0;
}
debug($Vertraeglichkeit);

// Gewissenhaftigkeit
$gitems = array(value('BF01_03'), value('BF01_08'), value('BF01_13'), value('BF01_18'), value('BF01_23'), value('BF01_28'));
$isValid = true;
$sum = 0;
foreach ($gitems as $value) {
    if ($value <= 0) {
        $isValid = false;
        break;
    }
    $sum += $value;
}
if ($isValid) {
    $Gewissenhaftigkeit = $sum / count($gitems);
} else {
    $Gewissenhaftigkeit = 0;
}
debug($Gewissenhaftigkeit);


replace('%Neurotizismus%', sprintf('%1.1f', $Neurotizismus));
replace('%Extraversion%', sprintf('%1.1f', $Extraversion));
replace('%Offenheit%', sprintf('%1.1f', $Offenheit));
replace('%Vertraeglichkeit%', sprintf('%1.1f', $Vertraeglichkeit));
replace('%Gewissenhaftigkeit%', sprintf('%1.1f', $Gewissenhaftigkeit));


$facetten = array('Neurotizismus', 'Extraversion', 'Offenheit', 'Vertraeglichkeit', 'Gewissenhaftigkeit');
```

After implementing a suiting php calculation of indices, I proceed to implement the radar chat. In this example,  I create a radar chart featuring two datasets: one containing our previously calculated indices and another with specified norm scores.  These norm scores can be obtained from scholarly publications; in this case, I use data from a study by Rammstedt et al. (2018) with _N_ = 1,338.

Subsequent to the PHP-code, I implement the HTML-Code. The HTML-Code is seperated it into three parts for ease of explanation. It is crucial to note that all three parts must be included in a single, uninterrupted HTML block to accurately reproduce the results. The first part of this HTML code serves multiple functions: it facilitates the creation of the actual PDF file, displays a download button beneath the radar chart, and establishes the canvas for the plot. For better visibility, I configure the button to appear in bold and steelblue text.

**Part1:**
```html
<title>Chart with Download Link</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>


    <style>
        /* Make the button text bold */
        #downloadPdf {
        font-weight: bold;
        color: steelblue;

        }
    </style>
     <button id="downloadPdf" type="button">Download PDF</button> 
 
 <div>
  <canvas id="myChart"></canvas>
 </div>
```


**Part2**:

Here, I add the real participant data and the specified norm scores on one single radar chart. Specifically, the second dataset used, is labeled `Normwerte` to plot `[2.74, 3.13, 3.27, 2.70, 2.70]` as fixed values. Additonally, the scale is set from 1 to 5 and label sizes are adjusted. 

```html
//<!-- This should be below part 1  -->
<script>
  const { jsPDF } = window.jspdf;
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Neurotizismus', 'Extraversion', 'Offenheit', 'Vertraeglichkeit', 'Gewissenhaftigkeit'],
      datasets: [{
        
//real data
label: 'individuelle Facettenausprägung',
        data: ['%Neurotizismus%', '%Extraversion%', '%Offenheit%', '%Vertraeglichkeit%', '%Gewissenhaftigkeit%'],
    fill: true,
    backgroundColor: [
      'rgba(153, 102, 255, 0.2)'
    ],
    borderColor: [
      'rgba(153, 102, 255, 1)'
    ],
        borderWidth: 1.5

    }, {

//norm data
label: 'Normwerte',
        data: [2.74,3.13,3.27,2.70,2.70],
    fill: true,
    backgroundColor: [
      'rgba(75, 192, 192, 0.2)'
    ],
    borderColor: [
      'rgba(75, 192, 192, 1)'
    ],
        borderWidth: 1.5


//options
      }]
    },
    options: { 
      scales: {
        r: {
          min: 0,
          max: 5,
          pointLabels: {
            font: {
              size: 15
            }
          },
          angleLines: {
            display: false // Hide the lines connecting the center to the labels
          },
          ticks: {
            stepSize: 1, // Set the step size for labels
            callback: function(value, index, values) {
              // Skip labels for specific values (e.g., 0) as 0 is not a real score (1-5)
              if (value === 0) {
                return '';
              }
              return value;
            }
          }
        }
      }
    }
  });
```


**Part3**:

In this segment of code, I write the PDF file and make it visually appealing. This involves incorporating various design elements such as headers, footers, lines, and textual content. I recommend including a brief explanation to guide participants in interpreting their results, highlighting the conditions and limitations of these interpretations. It is important to note that text sizes are specifically adjusted for this content. 
Should one wish to include different or additional blocks of text, further adjustments concerning text size, positioning, and other visual elements may be needed.

```javascript
  //<!-- This should be below part 2  -->
document.getElementById('downloadPdf').addEventListener('click', function() {
    html2canvas(ctx, {
      onrendered: function(canvas) {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const imgWidth = width - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add header
        pdf.setFontSize(16);
        pdf.text("Individuelle Auswertung", 105, 10, { align: 'center' });
        pdf.setDrawColor(70, 130, 180); // Set color to steel blue
        pdf.setLineWidth(0.5);
        pdf.line(20, 12, 190, 12);

        // Add header
        pdf.setFontSize(12);
        pdf.text("Untertitel", width / 2, 20, { align: 'center' });

        // Add text element above the chart
        pdf.setFontSize(10);
        const text = 
"Im Folgenden werden Ihre Persönlichkeitsmessungen anhand der BIG-5 präsentiert. Die BIG-5 Persönlichkeiten sind ein Modell der Persönlichkeitspsychologie, das die fünf Hauptdimensionen der Persönlichkeit beschreibt. Diese Dimensionen werden als Neurotizismus, Extraversion, Offenheit für Erfahrungen, Verträglichkeit und Gewissenhaftigkeit bezeichnet. Zusammengenommen bilden diese fünf Dimensionen ein umfassendes Bild der Persönlichkeit einer Person und können helfen, Ihr Verhalten und Ihre Interaktionen mit anderen besser zu verstehen. Es ist wichtig zu beachten, dass die BIG-5 Persönlichkeiten keine festen Kategorien sind und dass jeder Mensch einzigartig ist und seine eigenen individuellen Eigenschaften und Charakterzüge hat. Eine Beschreibung zu den einzelnen Facetten findet sich am Ende der Seite. Vergleichsdaten liefert die Arbeit von Rammstedt und Kollegen (2018), welche die Persönlichkeitsausprägungen von 1.338 Personen überprüft haben.";
        const lines = pdf.splitTextToSize(text, 180);
        const x = (width - 180) / 2; // Center the text block
        pdf.text(lines, x, 35); // Start the text at position (x, 35)

        // Calculate the position of the image based on the length of the text
        const imagePosition = 35 + (lines.length * 5);



       // Add the image
        pdf.addImage(imgData, 'PNG', (width - imgWidth * 0.9) / 2, imagePosition, imgWidth * 0.9, imgHeight * 0.72, 'NONE', 'FAST', 0, -imgHeight * 0.2);


        // Add construct definitions below the chart
        pdf.setFontSize(9);
        const textBelow = `
**Neurotizismus: Diese Dimension beschreibt die Tendenz, emotional instabil und anfällig für Stress zu sein. Menschen mit hohem Neurotizismus sind empfindlich, ängstlich und unruhig. Sie neigen dazu, sich Sorgen zu machen und haben ein hohes Bedürfnis nach Sicherheit.

**Extraversion: Diese Dimension beschreibt die Tendenz, aktiv und offen im sozialen Umgang zu sein. Menschen mit hoher Extraversion sind gesellig, energiegeladen und kontaktfreudig. Sie suchen die Gesellschaft anderer Menschen und genießen es, neue Leute kennenzulernen. Sie sind auch selbstbewusst und können ihre Meinungen offen äußern.

**Offenheit für Erfahrungen: Diese Dimension bezieht sich auf die Bereitschaft, neue Ideen und Erfahrungen zu akzeptieren und zu suchen. Menschen mit hoher Offenheit sind neugierig, kreativ und abenteuerlustig. Sie sind offen für neue Erfahrungen und haben eine große Bandbreite an Interessen. Sie sind auch offen für komplexe Ideen und können flexibel denken.

**Verträglichkeit: Diese Dimension bezieht sich auf die Fähigkeit, empathisch und kooperativ im sozialen Umgang zu sein. Menschen mit hoher Verträglichkeit sind freundlich, zuvorkommend und hilfsbereit. Sie sind auch geduldig und verstehen die Perspektiven anderer Menschen. Sie haben auch ein geringes Bedürfnis, andere zu kontrollieren oder zu manipulieren.

**Gewissenhaftigkeit: Diese Dimension bezieht sich auf die Fähigkeit, sorgfältig und verantwortungsbewusst zu handeln. Menschen mit hoher Gewissenhaftigkeit sind organisiert, zuverlässig und diszipliniert. Sie planen ihre Zeit und ihre Aktivitäten sorgfältig und setzen sich Ziele, die sie erreichen wollen. Sie sind auch selbstkontrolliert und können ihre Impulse unter Kontrolle halten.

Nähere Informationen in "The Five-Factor Model of Personality: Theoretical Perspectives" von Paul T. Costa Jr. und Robert R. McCrae (1996), in der Zeitschrift Annual Review of Psychology.`;

   const linesBelow = pdf.splitTextToSize(textBelow, 180);
   pdf.text(linesBelow, x, imagePosition + imgHeight - 57);  // Position below the image


    pdf.setDrawColor(70, 130, 180);  // Set color to steel blue
    pdf.line(20, 285, 190, 285);  // Draw line
    pdf.setFontSize(6);  // Set font size


    // Your footer text
    const footerText = 
`Dieses Dokument wurde automatisiert erstellt und entspricht den Datenschutzbestimmungen der DSGVO. Weder das Herunterladen des PDFs noch die gemachten Angaben können auf Ihre Person zurückgeführt werden. Es ist nicht möglich, dieses Dokument nachträglich anzufragen, da es nur während der Teilnahme an der Studie erstellt werden kann und auch nur von der befragten Person einsehbar ist.`;

    // Split text to fit within page margins
    const splitFooter = pdf.splitTextToSize(footerText, 140);  // 140 here means the text will wrap after reaching 140 units width

    // Output the lines
    pdf.text(splitFooter, pdf.internal.pageSize.getWidth() / 2, 287, { align: 'center', maxWidth: 140 });

    // Output date and time
    pdf.text(new Date().toLocaleString('de-DE'), pdf.internal.pageSize.getWidth() - 40, 10);

        // Save the PDF with the custom filename
        pdf.save("Ihre Auswertungsergebnisse.pdf");

      }
    });
  });
</script>
```

## 4 Addressing common issues
This section aims to address common issues that may arise during the implementation of graphical feedback in SoSci Survey. It covers topics like error resolution, debugging, handling missing values, PDF formatting, and more. 

### Common errors and their resolutions

#### Not all scales are on the same metric
When dealing with multiple scales that are not on the same metric, one can either adjust them to a common metric manually or normalize the scales (see example section). This ensures that the graphical representation is not misleading.

#### Debugging
Debugging in this context typically involves examining the PHP error logs and the JavaScript console for errors or warnings. Always ensure that PHP error reporting is enabled to catch and fix issues early. 

#### Missing values
One approach to handling missing values is to set conditional rules for index calculation. If a response is missing or invalid, the index could be set to 0 or the mean calculation skipped altogether.

#### Plot size adjustment
If the plot appears too large in the PDF file, its dimensions can be adjusted in the Chart.js configuration options by setting the `height` and `width` properties.

#### Changing plot types
To change the type of plot, one needs to modify the `type` property in the [Chart.js ](https://www.chartjs.org/docs/latest/samples/information.html) configuration. This will update the plot type for subsequent renderings. 

#### Extensive PDF file with all results
If one desires a comprehensive PDF file with all survey results, multiple pages will need to be created and written individually. This typically involves looping through each result set and adding it to a new PDF page.


### FAQ Section

**Q: I am encountering errors in my PHP code. How can I resolve them?**  
**A:** Consult the PHP error logs for in-depth information regarding the errors. Make sure that error reporting is enabled in your PHP settings for a comprehensive diagnostic overview. Note that some error messages appearing below the PHP code box may be benign and can be overlooked; however, exercise caution when interpreting error messages.

**Q: Can I include both a radar plot and a bar plot in the same PDF?**  
**A:** Yes, it is possible to incorporate multiple plots within a single PDF. This can be achieved by creating separate canvas elements for each plot and rendering them individually. Be aware that this may require adjustments to the plot dimensions within the PDF or necessitate the creation of multiple PDF pages.

**Q: Despite my efforts, my code still is not working. What should I do?**  
**A:** If troubleshooting proves ineffective, consider implementing the `.xml` file provided in the resource section and building your questionnaire from that foundation.

**Q: The plot in my PDF file appears distorted. How can I rectify this?**  
**A:** To correct distorted plot dimensions, modify the `height` and `width` properties in the Chart.js configuration settings.

**Q: How can I contribute to this project?**  
**A:** Contributions are welcome. Feel free to share your code examples and offer additional suggestions to enhance the project's utility.




## 5 Resources
   - Complete sosci project (`full.xml` -file) 
   - BFI sosci page only (`page.xml` -file)

You can download them [here](https://github.com/selvastics/selvastics.github.io/tree/main/resources/partcipant_report)


## 6 Additional examples
**Simple bar plot:**

For PHP:
```php
// Wert/Ergebnis ermitteln
// variable1
$variable1= valueMean(array(
'var_01', 
'var_02', 
'var_03', 
'var_04', 
'var_05', 
'var_06' 
));
debug($variable1);

// Wert/Ergebnis ermitteln
// variable2
$variable2= valueMean(array(
'var_07', 
'var_08', 
'var_09', 
'var_10', 
'var_11', 
'var_12' 
));
debug($variable2);


replace('%variable1%', sprintf('%1.1f', $variable1));
replace('%variable2%', sprintf('%1.1f', $variable2));
```

For HTML:
```html
<!-- Include the Chart.js library -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Create a canvas element to render the chart -->
<canvas id="barChart"></canvas>

<script>
  // Get the context of the canvas element
  var ctx = document.getElementById('barChart').getContext('2d');

  // Create a new bar chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['variable1', 'variable2'],
      datasets: [{
        data: ['%variable1%', '%variable2%']
        backgroundColor: 'rgba(178, 24, 43, 0.2)',
        borderColor: 'rgba(178, 24, 43, 1)',
        borderWidth: 1.5
      }]
    },
    options: {
      scales: {
        y: {
          min: 1,
          max: 7
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
</script>
```

**Simple radar bar plot:**

For HTML (PHP-code for the simple radar plot is idential to PHP-code of the simple bar plot):
```html
<!-- Create a canvas element to render the chart -->
<canvas id="radarChart"></canvas>

<script>
  // Get the context of the canvas element
  var ctx = document.getElementById('radarChart').getContext('2d');

  // Create a new radar chart
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Label1', 'Label2'],
      datasets: [{
        data: ['%Variable1%', '%Variable2%']
      }]
    }
  });
</script>
```


**Download any plot as PDF:**

For HTML:
```html
<!-- Include the jsPDF and html2canvas libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>

<!-- Add a button for downloading PDF -->
<button id="downloadPdf">Download PDF</button>

<script>
  // Add event listener for the button
  document.getElementById('downloadPdf').addEventListener('click', function() {
    html2canvas(document.getElementById('barChart'), {
      onrendered: function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('download.pdf');
      }
    });
  });
</script>
```


**Multiple bar plot with normalization:**

For PHP:
```php
// Initialize arrays for scale ranges
$scale_ranges = array(
    'Achtsamkeit' => 4,
    'Lebenszufriedenheit' => 7,
    'Prokastination' => 4,
    'Selbstwirksamkeit' => 4,
    'PolitischeSelbstwirksamkeit' => 7,
    'BerufsUndOrganisationsklima' => 6
);

// Initialize arrays for values of each scale
$scale_values = array(
    'Achtsamkeit' => array(value('VA07_01'), value('VA07_02'), value('VA07_03'), value('VA07_04'), value('VA07_05'), value('VA07_06'), value('VA07_07'), value('VA07_08'), value('VA07_09'), value('VA07_10'), value('VA07_11'), value('VA07_12'), value('VA07_13'), value('VA07_14')),
    'Lebenszufriedenheit' => array(value('VA01_01'), value('VA01_02'), value('VA01_03'), value('VA01_04'), value('VA01_05')),
    'Prokastination' => array(value('VA09_01'), value('VA09_02'), value('VA09_03'), value('VA09_04'), value('VA09_05'), value('VA09_06'), value('VA09_07'), value('VA09_08'), value('VA09_09')),
    'Selbstwirksamkeit' => array(value('VA10_01'), value('VA10_02'), value('VA10_03'), value('VA10_04'), value('VA10_05'), value('VA10_06'), value('VA10_07'), value('VA10_08'), value('VA10_09'), value('VA10_10')),
    'PolitischeSelbstwirksamkeit' => array(value('VA02_01'), value('VA02_02'), value('VA02_03'), value('VA02_04'), value('VA02_05'), value('VA02_06'), value('VA02_07'), value('VA02_08'), value('VA02_09'), value('VA02_10')),
    'BerufsUndOrganisationsklima' => array(value('VA08_01'), value('VA08_02'), value('VA08_03'), value('VA08_04'), value('VA08_05'), value('VA08_06'), value('VA08_07'), value('VA08_08'))
);

// Loop through each scale and its values
foreach ($scale_values as $scale => $values) {
    $sum = 0;
    $count = 0;
    foreach ($values as $value) {
        if ($value >= 0) {
            $sum += (int)$value; // Cast to int to avoid operand type issues
            $count++;
        }
    }
    if ($count > 0) {
        $mean = $sum / $count;
        // Normalize the mean
        $normalized_mean = ($mean - 1) / ($scale_ranges[$scale] - 1);
        replace('%' . $scale . '%', sprintf('%1.1f', $normalized_mean));
    } else {
        replace('%' . $scale . '%', 'NaN');
    }
}
```

For HTML:
```html
<!-- Include the Chart.js library -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Create a canvas element to render the chart -->
<canvas id="barChart"></canvas>

<script>
  // Get the context of the canvas element
  var ctx = document.getElementById('barChart').getContext('2d');

  // Create a new bar chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Achtsamkeit', 'Lebenszufriedenheit', 'Prokastination', 'Selbstwirksamkeit', 'Politische Selbstwirksamkeit', 'Berufs- und Organisationsklima'],
      datasets: [{
        data: ['%Achtsamkeit%', '%Lebenszufriedenheit%', '%Prokastination%', '%Selbstwirksamkeit%', '%PolitischeSelbstwirksamkeit%', '%BerufsUndOrganisationsklima%'],
        fill: true,
backgroundColor: [
  'rgba(178, 24, 43, 0.2)',
  'rgba(33, 102, 172, 0.2)',
  'rgba(0, 128, 0, 0.2)',
  'rgba(255, 0, 0, 0.2)',
  'rgba(255, 127, 0, 0.2)',
  'rgba(106, 61, 154, 0.2)'
],
borderColor: [
  'rgba(178, 24, 43, 1)',
  'rgba(33, 102, 172, 1)',
  'rgba(0, 128, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 127, 0, 1)',
  'rgba(106, 61, 154, 1)'
        ],
        borderWidth: 1.5
      }]
    },
    options: {
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          min: 0,
          max: 1,
          pointLabels: {
            font: {
              size: 18
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
</script>
```

## References
r-graph Gallery. (n.d.). Retrieved from [https://r-graph-gallery.com/index.html](https://r-graph-gallery.com/index.html)

SoSci Survey. (n.d.). Features. Retrieved from [https://www.soscisurvey.de/en/features](https://www.soscisurvey.de/en/features)

SoSci Survey. (n.d.). Creating Feedback: Correct. Retrieved from [https://www.soscisurvey.de/help/doku.php/en:create:feedback-correct](https://www.soscisurvey.de/help/doku.php/en:create:feedback-correct)

SoSci Survey. (n.d.). Creating Feedback: Visual. Retrieved from [https://www.soscisurvey.de/help/doku.php/en:create:feedback-visual](https://www.soscisurvey.de/help/doku.php/en:create:feedback-visual)

SoSci Survey. (n.d.). Creating Layout. Retrieved from [https://www.soscisurvey.de/help/doku.php/de:create:layout](https://www.soscisurvey.de/help/doku.php/de:create:layout)

SoSci Survey. (n.d.). Creating Questions: Scale - Inverting Items. Retrieved from [https://www.soscisurvey.de/help/doku.php/en:create:questions:scale#inverting_items](https://www.soscisurvey.de/help/doku.php/en:create:questions:scale#inverting_items)

Chart.js. (n.d.). Samples. Retrieved from [https://www.chartjs.org/docs/latest/samples/information.html](https://www.chartjs.org/docs/latest/samples/information.html)

Rammstedt, B., Lechner, C. M., & Danner, D. (2018). Relationships between personality and cognitive ability: A facet-level analysis. *Journal of Intelligence, 6*(2), 28. [https://doi.org/10.1027/1015-5759/a000481](https://doi.org/10.1027/1015-5759/a000481)
