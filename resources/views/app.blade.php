<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/style.css">
    <title>A Web Page</title>
</head>
<body id="app">
    <div class="wrapper">

        <div class="hat">
            <div class="hat-first">
                <h3>Cool project name - Current Date</h3>

                <div id="myDropdown">
                    <div class="myDropdown">
                    <span class="material-icons">account_circle</span>
                    <h5>Your Name</h5>
                    <span class="material-icons">arrow_drop_down</span>
                    </div>
                    <div class="dropped">
                        <a href="#">some text</a>
                        <a href="#">some text</a>
                        <hr>
                        <a href="#">Exit</a>
                    </div>
                </div>
            </div>
            <hr class="under-hat">
        </div>

        <x-holder></x-holder>

    </div>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

<script src="{{ mix('/js/app.js') }}"></script>
</body>
</html>
