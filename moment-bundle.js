moment = this.moment;
//console.log(moment, this);


if(Meteor.isServer) {
    var tzCollection = new Mongo.Collection("timezoneData");
    
    Meteor.startup(function() {
        console.log("startup: checking moment:", typeof moment);
        console.log("startup: checking moment.recur:", moment ? typeof moment.recur : undefined);
        console.log("startup: checking moment.tz:", moment ? typeof moment.tz : undefined);

        var data = tzCollection.find({}).fetch();
        if(data.length == 0) {
            var json = JSON.parse(Assets.getText('moment-timezone/data/packed/latest.json'));
            console.log("Read timezone data from file");
            tzCollection.insert(json);
            moment.tz.load(json);
        } else
            moment.tz.load(data[0]);
        console.log("Check Asia/Tokyo tz: ", moment.tz("Asia/Tokyo") ? "exists" : "missing");
    });

    Meteor.publish("timezoneData", function () {
        console.log("timezoneData","publish entered");
        //var tzCollection = new Mongo.Collection("timezoneData");
        return tzCollection.find({});
    });
}

if(Meteor.isClient) {
    moment.loadTimezoneData = function() {
        console.log("timezoneData","subscribing");
        Meteor.subscribe("timezoneData", function() {
            console.log("timezoneData","subscribe returned");

            var tzCollection = new Mongo.Collection("timezoneData");
            var data = tzCollection.find({}).fetch();
            if(data.length > 0) {
                console.log("Loading timezone data");
                moment.tz.load(data[0]);
            }
            else
                console.log("No timezone data");

            console.log("Check Asia/Tokyo tz: ", moment.tz("Asia/Tokyo") ? "exists" : "missing");
        });
    }
    
    Meteor.startup(function() {
        moment.loadTimezoneData();
    });
}

debugger;
//console.log(data);
