  const STORAGE_KEY = 'student_list_storage';
  const number = 'number';

  var app = new Vue({
      el: '#app',
      data: {
          n:0,
          student_ex1: {id: '6304101382', fname: 'เอกรินทร์', lname: 'แสงยอ', email: 'specialday191@gmail.com', gpa: '3.52'},
          student_ex2: {id: '6304101376', fname: 'อัครวุฒิ', lname: 'ปริสุทธิ์สุนทร', email: 'KrikSan1899@hotmail.co.th', gpa: '1.89'},
          student: {},
          student_list: [],
          del_index: null,
          reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
          errors: {
              form_error: true,
              id_error: true,
              fname_error: true,
              lname_error: true,
              email_error: true,
              gpa_error: true
          }
      },

      created() {
          this.student_list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
          this.n = JSON.parse(localStorage.getItem(number));
              if(this.n==null){
                 this.addStudent_first();
              }
      },
      methods: {

          idcheck: function () {
              //id check  
              if (this.student.id.length < 10) {
                  this.errors.id_error = true
                  this.errors.form_error = true
              }
              else {
                  this.errors.id_error = false
                  if (this.errors.id_error == false && this.errors.fname_error == false && this.errors.lname_error == false && this.errors.email_error == false && this.errors.gpa_error == false) {
                      this.errors.form_error = false
                  }
              }

          },

          fnamecheck: function () {
              // firstname check
              if (this.student.fname.length > 2 && this.student.fname.length <= 60) {
                  this.errors.fname_error = false
                  if (this.errors.id_error == false && this.errors.fname_error == false && this.errors.lname_error == false && this.errors.email_error == false && this.errors.gpa_error == false) {
                      this.errors.form_error = false
                  }
              }
              else {
                  this.errors.fname_error = true
                  this.errors.form_error = true
              }
          },

          lnamecheck: function () {
              // lastname check
              if (this.student.lname.length > 2 && this.student.lname.length <= 60) {
                  this.errors.lname_error = false
                  if (this.errors.id_error == false && this.errors.fname_error == false && this.errors.lname_error == false && this.errors.email_error == false && this.errors.gpa_error == false) {
                      this.errors.form_error = false
                  }
              }
              else {
                  this.errors.lname_error = true
                  this.errors.form_error = true
              }
          },

          // email check
          emailcheck: function () {
              if (this.student.email == null || this.student.email == '') {
                  this.errors.email_error = true
                  this.errors.form_error = true
              }
              else if (!this.reg.test(this.student.email)) {
                  this.errors.email_error = true
                  this.errors.form_error = true
              }
              else {
                  this.errors.email_error = false
                  if (this.errors.id_error == false && this.errors.fname_error == false && this.errors.lname_error == false && this.errors.email_error == false && this.errors.gpa_error == false) {
                      this.errors.form_error = false
                  }
              }
          },

          // gpa check
          gpacheck: function () {
              var point = this.student.gpa.indexOf(".")
              var length = this.student.gpa.length;
              if (this.student.gpa != "" && this.student.gpa >= 0.00 && this.student.gpa <= 4.00 && point != 0 && length == 4) {
                  this.errors.gpa_error = false
                  if (this.errors.id_error == false && this.errors.fname_error == false && this.errors.lname_error == false && this.errors.email_error == false && this.errors.gpa_error == false) {
                      this.errors.form_error = false
                  }
              }
              else {
                  this.errors.gpa_error = true
                  this.errors.form_error = true
              }
          },

          delete_click: function(index){
            this.del_index = index
          },

          addStudent: function (studentadd) {
              this.student_list.push(studentadd)
              this.student = {}
              localStorage.setItem(STORAGE_KEY, JSON.stringify(this.student_list));
              alert('บันทึกข้อมูลนักศึกษาเรียบร้อยแล้ว')
          },

          deleteStudent: function() {
              this.student_list.splice(this.del_index, 1)
              localStorage.setItem(STORAGE_KEY, JSON.stringify(this.student_list));
              alert('ลบข้อมูลนักศึกษาออกแล้ว')
          },
        
        addStudent_first: function(){
            this.student_list.push(this.student_ex1)
            this.student_list.push(this.student_ex2)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.student_list));
            this.n++;
            localStorage.setItem(number, JSON.stringify(this.n));
          }

      },
  });

  function isNumericKey(evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31
          && (charCode < 48 || charCode > 57))
          return true;
      return false;
  }


  function isNumberKey(evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31
          && (charCode < 48 || charCode > 57))
          return false;
      return true;
  }

  function isNumberKeyfloat(evt) {
      var charCode = (evt.which) ? evt.which : event.keyCode
      if (charCode == 46) {
          var inputValue = $("#floor").val();
          var count = (inputValue.match(/'.'/g) || []).length;
          if (count < 1) {
              if (inputValue.indexOf('.') < 1) {
                  return true;
              }
              return false;
          } else {
              return false;
          }
      }
      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;
  }
