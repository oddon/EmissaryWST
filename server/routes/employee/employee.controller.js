'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to employees
 */
var exports = module.exports;

var Employee = require('../../models/Employee');

function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; i++) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.login = function(req, res) {
  var token = new Token({
    value: uid(256),
    userId: req.user._id
  });

  token.save(function(err, t) {
    if(err) {
      return res.status(400).json({error: "Could not save access token."});
    }
    return res.status(200).json(t.toJSON());
  });
};

exports.getAllEmployees = function(req, res) {
  Employee.find({company_id : req.params.id}, { password: 0}, function(err, result) {
    if(err){
      return res.status(400).send({error: "Can not Find"});
    }
    return res.status(200).json(result);
  });
};

exports.getById = function(req, res) {
   Employee.findById(req.params.id, { password: 0}, function(err, employee) {
      if(err) {
          return res.status(400).json({error: "Can not Find"});
      } else {
          console.log(employee)
          return res.status(200).json(employee);
      }
    });
};

exports.insert = function(req, res) {
    var employee = new Employee();

    /* required info */
    employee.first_name = req.body.first_name;
    employee.last_name = req.body.last_name;
    employee.email = req.body.email;
    employee.phone_number  = req.body.phone_number;
    employee.company_id = req.body.company_id;
    employee.password = employee.generateHash(req.body.password);
    employee.role =  req.body.role;

    employee.save(function(err, e) {
        if(err) {
            return res.status(400).json({error: "Can not Save"});
        }
        var employee_json=e.toJSON();
        delete employee_json.password;
        return res.status(200).json(employee_json);
    });
};


exports.update = function(req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if(err)
            return res.status(400).json({error: "Can not Update"});
 
        employee.first_name = req.body.first_name || employee.first_name;
        employee.last_name = req.body.last_name || employee.last_name;
        employee.email = req.body.email || employee.email;
        employee.phone_number = req.body.phone_number || employee.phone_number;
        employee.password = employee.generateHash(req.body.password) || employee.password;
        employee.role = req.body.role || employee.role;

        employee.save(function(err) {
            console.log(err);
            console.log(employee);
            if(err)
                return res.status(400).json({error: "Can not Save"});
            var employee_json=employee.toJSON();
            delete employee_json.password;
            return res.status(200).send(employee_json);
        });
   });
};

exports.delete = function(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    return employee.remove(function(err) {
      if(err) {
        res.status(400).json({error: "Can not Find"});
      } else {
          var employee_json=employee.toJSON();
          delete employee_json.password;
          return res.status(200).send(employee_json);
      }
    });
  });
};
