// console.log('testing')

// $(() => {

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#file')
                .attr('src', e.target.result)
                // .width(150)
                .height(300);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// });

//choose file option
//http://jsbin.com/uboqu3/1/edit?html,js,output