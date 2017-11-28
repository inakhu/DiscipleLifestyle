angular.module('htsApp.constants', [])

    .constant('APP_SERVER',{
        url:'http://www.hezecom.org/myapp/Appserver/',
        lurl:'http://localhost/MOBILE/MobileHealth/Appserver/',
        wurl:'http://www.hezecom.org/myapp/Appserver/'
    })

    .constant('USER_VARS', {
        myname: localStorage.getItem("myname"),
        myusername: localStorage.getItem("myusername"),
        mytoken: localStorage.getItem("mytoken"),
        myuserid: localStorage.getItem("myuserid"),
        myposition: localStorage.getItem("myposition"),
        uData:localStorage.getItem("myusername")+'/'+localStorage.getItem("mytoken")
    })

    .constant('USER_ROLES', {
        sadmin: 'sadmin_role',
        admin: 'admin_role',
        doctor: 'doctor_role',
        patient: 'patient_role'
    });