
# How to provide direct feedback on survey results for your participants
**Author**: [Clievins Selva](https://github.com/selvastics)  
**Date**: October 12, 2023  
**License**: CC BY 4.0

## Abstract
This article outlines the implementation of graphical feedback for participants using SoSci Survey. By leveraging HTML, CSS, and JavaScript, the survey conductor can display individual feedback for each participant, enhancing engagement and improving data quality. Two chart types, a bar plot and a radar plot, are discussed in detail. Additionally, a downloadable PDF feature that complies with the General Data Protection Regulation is also presented. For direct usage, a practical example is provided for implementing the Big Five Inventory.

## Table of Contents
1. [Introduction](#1-introduction)
2. [Theoretical framework](#2-theoretical-framework)
    1. [The primacy of immediate feedback](#the-primacy-of-immediate-feedback)
    2. [GDPR compliance and client-side data processing](#gdpr-compliance-and-client-side-data-processing)
    3. [Chart types for graphical representation](#chart-types-for-graphical-representation)
3. [Technical implementation](#Prerequisites)
    1. [Prerequisites](#prerequisites)
    2. [Calculation of participant indices](#calculation-of-participant-indices)
    3. [Bar plot: code explanation](#bar-plot-code-explanation)    
    4. [Further customization: fine tuning](#further-customization-fine-tuning)
    5. [Radar plot: code explanation](#radar-plot-code-explanation)    
    6. [Further customization: norm scores](#further-customization-norm-scores)
    7. [Providing a downloadable PDF](#providing-a-downloadable-pdf)
4. [Practical example: Big Five Inventory for personality assessment](#4-practical-example-big-five-inventory-for-personality-assessment)
5. [Addressing common issues](#5-addressing-common-issues)
6. [Conclusion](#6-conclusion)
7. [Resources](#7-resources)
11. [Literature](#literature)
---

## 1. Introduction
SoSci Survey is an online tool frequently used in academic research for creating surveys. It offers various features, including question branching, randomization, and multilingual support (QUELLE). However, its real power lies in the capacity to integrate HTML, CSS, and JavaScript, allowing for real-time feedback through graphical representation of participant responses. This could potentially elevate the validity of the data collected by enhancing participant engagement (QUELLE).

Often, results are only feasible after conducting a study. At this point, it is not possible to assign individual feedback to participants because of anonymity. So how can one provide feedback without getting any information to assign results to participants?

To address this challenge, we propose a solution that combines the power of SoSci Survey's features with external tools and techniques. This approach enables researchers to provide meaningful feedback to participants while maintaining the anonymity of their responses. The following sections will outline the steps required to implement this solution.




## 2. Theoretical Framework
### The Primacy of Immediate Feedback

Immediate feedback is a critical aspect of the learning process, which has been widely studied across different fields including psychology, education, and human-computer interaction. According to the constructivist learning theory, immediate feedback helps individuals to correct errors and reinforce learning, making the information processing more effective. In the context of online surveys, providing immediate feedback to participants can increase their engagement, reduce dropout rates, and potentially enhance the quality and validity of the data collected (SOURCE). When participants are able to see a visual representation of their responses or performance in real-time, they may be more motivated to complete the survey attentively and thoughtfully. XX report higher engagement after implementing the feedback for participants. si,milar results are found in ... . also this is something, frequently asked for in large assesment panel studies SOURCE

However, as a researcher this can be quite an dilemma. Often times data potenctiuon protocols and participants were generally not asked to provide sensible contact informations. 



### GDPR Compliance and Client-side Data Processing

The General Data Protection Regulation (GDPR) has imposed stringent requirements on data protection and privacy in Europe, affecting how personal data is collected, processed, and stored. One of the key principles of GDPR is data minimization, which entails collecting only the necessary data and processing it locally on the client-side wherever possible. Client-side data processing also aligns with the principle of privacy by design, which advocates for data protection measures to be integrated into the design of systems and processes. In the context of online surveys, enabling participants to download their results directly without collecting their email addresses or other personal identifiers, and processing data locally on their devices, are crucial steps towards GDPR compliance.

### Chart Types for Graphical Representation

The presentation of data can be done in numerous ways, each with its own strengths and weaknesses. The choice of chart type can significantly influence the comprehension and interpretation of results.

Bar plots are effective for comparing individual data points across different categories. They provide a clear and concise visual representation that can be easily understood by participants. On the other hand, radar plots are useful for displaying multivariate data in a way that is easy to understand and analyze. They allow for the comparison of multiple variables at once, making them particularly suitable for displaying a participant's personality profile, for example.

While this paper focuses on these two types of charts, the principles and techniques discussed can be adapted to numerous other types of charts. The [r-graph Gallery ](https://r-graph-gallery.com/4-barplot-with-error-bar.html) provides numerous examples of how data can be plotted, offering a valuable resource for researchers looking to implement suiting graphical elements specific to their variables of interest. 





## 3. Technical Implementation 

### Prerequisites
- A working SoSci Survey project 
- Basic familiarity with HTML, CSS, and JavaScript (if not, the example section is for you)


 `%variable1%` and `%variable2%` are placeholders for the variables that will be replaced by the participant's actual scores. 

 as well as 'var_01' to 'var_12' these are you ... the are in xx replace them with your variables. The following code exmaples are the basic code for the chart. 

### Calculation of participant indices

The provided PHP code snippet calculates two variables, `variable1` and `variable2`, by taking the mean of six distinct variables each. These calculated means are then formatted to one decimal place and are intended to be used in a chart. The code relies on a user-defined function, `valueMean()`, to perform the mean calculations. 

1. **Calculating Mean for `variable1` and `variable2`**: The `valueMean()` function is presumably defined elsewhere to calculate the mean of an array of values. Here it is used to calculate the mean for two sets of variables (`var_01` to `var_06` for `variable1` and `var_07` to `var_12` for `variable2`).

    ```php
    $variable1= valueMean(array('var_01', 'var_02', 'var_03', 'var_04', 'var_05', 'var_06'));
    $variable2= valueMean(array('var_07', 'var_08', 'var_09', 'var_10', 'var_11', 'var_12'));
    ```

2. **Debugging**: The `debug($variable1)` and `debug($variable2)` lines are for debugging purposes, presumably printing the calculated mean values to the console or log.
    ```php
    debug($variable1);
    debug($variable2);
    ```

3. **String Formatting and Replacement**: The `sprintf('%1.1f', $variable1)` and `sprintf('%1.1f', $variable2)` lines format the mean values to one decimal place. These formatted values replace `%variable1%` and `%variable2%`, which are placeholders likely used in a subsequent chart or report.
    ```php
    replace('%variable1%', sprintf('%1.1f', $variable1));
    replace('%variable2%', sprintf('%1.1f', $variable2));
    ```



### Bar Plot: Code Explanation

 The code provided is an HTML/JavaScript snippet that uses the Chart.js library to render a bar chart. I compare `variable1` and `variable2` in this example.  The chart is customized with specific colors for the background and border, as well as border width. The Y-axis scale is set to range between 1 and 7. This explanation will dissect the code, focusing on key elements like the data structure, aesthetic properties, and configuration options.

1. **Including Chart.js**: The Chart.js library is included via a script tag, which is essential for rendering the chart.
    ```html
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    ```

2. **Canvas Element**: A canvas element with the id `barChart` is created. This is where the chart will be rendered.
    ```html
    <canvas id="barChart"></canvas>
    ```

3. **JavaScript Code**: The main JavaScript code does the following:

    - **Context Retrieval**: The context of the canvas is obtained using 
    ```javascript
    var ctx = document.getElementById('barChart').getContext('2d');
    ```

    - **Data and Aesthetics**: The `data` object contains labels (`variable1` and `variable2`) and datasets. The datasets have data points, background color, border color, and border width.
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

    - **Options**: You can set additional options like scales and plugins. Here, the Y-axis is limited to values between 1 and 7, and the legend is hidden.
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

### Further Customization: Fine tuning
You can further customize the `backgroundColor`, `borderColor`, and `borderWidth` by changing their respective values in the dataset object. For more colors, you can use any valid CSS color specification like hex, RGB, or RGBA values.
You can also include error bars (represented as Standard deviation, Standard error or Confidence Interval) 



### Radar Plot: Code Explanation

The code snippet is a straightforward implementation of a radar chart using the Chart.js library. It creates a radar chart with two labels: `Label1` and `Label2`, and uses two variables (`%Variable1%` and `%Variable2%`) for plotting. The utility of norm scores in radar plots for aiding participant interpretation is also mentioned.

1. **Canvas Element**: Similar to the bar chart, a canvas element with the id `radarChart` is defined. This serves as the rendering area for the radar chart.
    ```html
    <canvas id="radarChart"></canvas>
    ```

2. **JavaScript Context**: The 2D rendering context of the canvas element is obtained, allowing drawing operations.
    ```javascript
    var ctx = document.getElementById('radarChart').getContext('2d');
    ```

3. **Radar Chart Creation**: A new Chart object is instantiated with the type set to `radar`. The data object contains labels and datasets, where `%Variable1%` and `%Variable2%` are placeholders that would be replaced by actual values.
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

### Further Customization: Norm scores
Norm scores can be particularly useful for helping participants interpret their results. These are often represented as additional datasets on the radar chart, allowing for direct comparison between individual and normative data. This can be achieved using *SPELLIGN EROR* set values that are displayed alongsite the participant values. You can add an additional radar chart to overlay using xxx funciton. An example is provided in the resources. This can be particularly useful for radar plots, for which an example code is provided. Adaptions for other plots are accordingly. 





### Providing a Downloadable PDF

The provided HTML and JavaScript code snippet demonstrates the use of `jsPDF` and `html2canvas` libraries to enable a client-side PDF download of a rendered chart. A button is provided, and upon clicking it, the canvas containing the chart is converted to an image, which is then embedded into a PDF file. This explanation will discuss the inclusion of the required libraries, the button's functionality, and the JavaScript logic for converting the canvas to a PDF.

1. **Library Inclusion**: The `jsPDF` and `html2canvas` libraries are included to facilitate PDF creation and canvas-to-image conversion, respectively.
    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    ```

2. **Download Button**: A simple HTML button with the id `downloadPdf` is added, which will trigger the PDF download when clicked.
    ```html
    <button id="downloadPdf">Download PDF</button>
    ```

3. **JavaScript Logic**: An event listener is attached to the button, and upon clicking, it performs the following operations:
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



## 4. Practical Example: Big Five Inventory for Personality Assessment 

The Big Five Inventory (BFI) is a widely recognized instrument for assessing five key dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. For the purposes of this guide, we will focus on implementing the BFI based on the work of Sato (2020). This practical example demonstrates how participants can receive a PDF download after responding to BFI items on SoSci Survey.

To implement the BFI in SoSci Survey, create a new questionnaire and add the BFI items as questions. Make sure to name the variables according to the following naming convention, as we will use these variable names in our code:

- Openness: `Openness_Score`
- Conscientiousness: `Conscientiousness_Score`
- Extraversion: `Extraversion_Score`
- Agreeableness: `Agreeableness_Score`
- Neuroticism: `Neuroticism_Score`



The code assumes that there is a question category BF01 with individual item 1 to 30.  
image.png

As item 1,3,7,8,10,14,17,19,20,21,24,26,27,28 and 30 are reversed, we can either set these items as reversed items within sosci (as it is done in this example), or calculate the reversed score using: 


You can also implement this BFI items using the xml file provided in the resources. this would implement the sosci items needed to implement this code.

first we calculate means with a php code chunck. After that, we add, that values should be set to NULL, when not all qustiones were answeered. 

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


However, the problem with this apporaoch is, that it assumes that every participant responds to all items validitely. One might want to calculate indices conditionally e.g., when all responses are present and valid. An Alternative way is to set an index to 0, when the items to calculate the mean contain an invalid responses (here indicated by values <=0). An example of this is provided below.

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


After implementing a suiting php calculation of indices, we continue to implement the radar chat. We create in this example a radar plot with two datasets. a our previously calculated and one with specified scores. To can get these scores using a publication with normed scores. I use XXXXX for this example. 
Now we implement the HTML-Code. I will seperated it into three parts. All three part must be implemented in one conitnuous html chunck to reproduce the results. 
The first cpart of the code allows us to write the actual PDF file, display a button below the plot to download it and create the canvas. I specify the button to be bold and steelblue for better visual. 

Part1:
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


Part2: here I add the real participant datan and norm score values which are specified using scores reported in XXX Sato. Additonally the the scale is set to 1 to 5 and label sizes are adjusted. 

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


Part3: In this code chunck i write the PDF file and make it visually appeling by including, Headers, footers, lines and text elements. It is recommended to brief participants about their results (its interpretations, conditions and limtis). Note that sizes are adjusted for this text. You might want to include other chuncks of text which need further adjustments regarding text size, text positioning and additional elements. 

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
The text chuncks i juse can be easly changed. Based on the text length and sizes, one might need to adapt the positioning. This can sometimes be tricky. 




## 5. Addressing Common Issues
   - Common errors and their resolutions


 not all scales are on the same metric. do... or normalize them using   

 - debugging
- missing values 
-formatting the PDF file (e.g. Text before and after the plot. 
plot is to big  -> adjust size using:
- i want extensive one PDF file with all the results. Than you need to create multiple pages and write each page individually 
-change plot type

   - FAQ section

### FAQ PLACEGOLDER

**Q: I want to prevent robots from indexing my custom error pages by
setting the robots meta tag in the HTML head to "noindex".**

**A:** There is no need to. **Customerror** returns the correct HTTP
status codes (403 and 404). This will prevent robots from indexing the
error pages.

**Q: I want to customize the custom error template output.**

**A:** In your theme template folder for your site, copy the template
provided by the **Customerror** module
(i.e. `templates/customerror.html.twig`) and then make your
modifications there.

**Q: I want to have a different template for my 404 and 403 pages.**

**A:** Copy `customerror.html.twig` to
`customerror--404.html.twig` and `customerror--403.html.twig`. You
do not need a `customerror.html.twig` for this to work.


## 6. Conclusion

In this article, we have discussed how to provide direct feedback on survey results for your participants using SoSci Survey. By leveraging HTML, CSS, and JavaScript, researchers can create engaging and informative feedback that enhances the validity of the data collected. We have also demonstrated the implementation of a downloadable PDF feature that complies with the General Data Protection Regulation. We hope that this article has provided you with valuable insights and practical guidance for improving your survey research.


Providing real-time graphical feedback in SoSci Survey enriches the participant experience and is likely to improve data quality. By adhering to GDPR guidelines, this feature makes an excellent addition to any academic survey.



## 7. Resources
   - Complete script 
   - Multiple bar plot example



###EXAMPLE1 Full Code Bar plot:

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


### EXAMPLE2 change barplot to linechart

### EXAMPLE3
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




### EXAMPLE 3
download
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







## Literature

https://www.soscisurvey.de/help/doku.php/en:create:feedback-correct
https://www.soscisurvey.de/help/doku.php/en:create:feedback-visual

