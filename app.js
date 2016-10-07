var express =       require('express')
    , http =        require('http')
    , path =        require('path');

var app = express();

app.set('views', __dirname + '/app');

/*
app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
*/
app.use(express.static(path.join(__dirname, 'app')));


/*
app.use(express.static(path.join(__dirname, 'ign')));
app.use(express.static(path.join(__dirname, 'ign/html/desktop')));
*/

app.set('port', process.env.PORT || 8002);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

