

$(() => {
//===========================
//=== Home Page Scripts
//===========================
//======
//= AJAX for Log In and Sign Up forms
//======
    const logInSignUp = (form, formData) => {
        $.ajax({
            type:'POST',
            url:$(form).attr('action'),
            data:formData
        }).then((data) => {
            if (data === 'error') {
                $('.textInput').val("")
                return
            }
            window.location.href = data;
        },
        (error) => {

        })
    }

    // const hello = () => {
    //     alert('hello')
    // }
    // setTimeout(hello, 2000)
    //======
    //= Log In Submit Listener
    //======
    $('#logInForm').on('submit', (event) => {
        event.preventDefault()
        const form = $('#logInForm')
        const formData = $(form).serialize()
        logInSignUp(form, formData)

    })
    //======
    //= Sign Up Submit Listener
    //======
    $('#signUpForm').on('submit', (event) => {
        event.preventDefault()
        const form = $('#signUpForm')
        const formData = $(form).serialize()
        logInSignUp(form, formData)

    })

//===========================
//=== Dashboard Scripts
//===========================
$('.indexCol').on('click', (event) => {
    const target = $(event.target).attr('data-id');
    console.log(target);
    $.ajax({
        url:('/dashboard/'+ target)
    }).then(
        (carcass) => {
            populate(carcass)
        },
        (error) => {
            console.log(error);
        }
    )
})

const populate = (carcass) => {
    console.log(carcass);
    // $('#detailsModal').append(carcass)
    // $('#detailsModal').modal('toggle')
}

})
