

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
            $('.textInput').val("")
            return
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
    //======
    //= Load visual markers on building mock-up based on data-floor attribute for each carcass listed
    //======
    const foodAlert = () => {
        $('.indexCol').each( (i,obj)=>{
            const floorNumber = $(obj).attr('data-floor')
            const id = $(obj).attr('data-id')
            const room = $(obj).attr('data-room')
            const name = $(obj).attr('data-name')


            const $foodAlert =
                $('<div>')
                .addClass('foodAlert')
                .attr('data-id',id)
                .attr('data-room',room)
                .attr('data-name',name)
                .attr('data-floor',floorNumber)
            $('#floor'+floorNumber).prepend($foodAlert)
        })
    }
    //======
    //= Alert Popups with room information
    //=====
    const alertInfoPopUp = () => {
        $('.foodAlert').hover((event) => {
            const pos = $(event.target).position()
            const room = $(event.currentTarget).data('room')
            const floor = $(event.currentTarget).data('floor')
            let name = $(event.currentTarget).data('name')
            if (name) {
                name = `<p class = 'm-0'>${name}</p>`
            }else{
                name = ""
            }

            $('#floor'+floor).append($('<div>')
            .css('top',(pos.top + 37)+'px' )
            .css('left',pos.left+'px' )
            .css('padding','3px')
            .html(`<p class = 'm-0'>Rm: ${room}</p>${name}`)
            .addClass('alertInfo'))
        },(event) => {
            $('.alertInfo').hide()
            // console.log('Bye!');
        })
    }

    foodAlert()
    alertInfoPopUp()
//======
//= AJAX for adding Comments
//======
const postComment = (form, formData) => {
    $.ajax({
        type:'PUT',
        url:$(form).attr('action'),
        data:formData
    }).then((data) => {
        if (data === 'error') {
            $('.textInput').val("")
            return
        }
        // console.log(data);
        window.location.href = data;
    },
    (error) => {
        $('.textInput').val("")
        return
    })
}

//======
//= Click event to open modal to show carcss details. I know how to do this in a more simple way, but I didn't make this update until later and didn't want to have to go through all of my html and js to make updates.
//======
    $('.clickModal').on('click',(event) => {
        let target = ""
        // console.log(event.target, event.currentTarget);
        if (event.target === event.currentTarget) {
            target = $(event.target).children().eq(0).attr('data-id');
        }else{
            target = $(event.target).attr('data-id');
        }

        // console.log(target);
        details(target)
        })
    //====
    //=Click event for alertInfoPopUp
    //====
    $('.foodAlert').on('click',(event) => {
        const target = $(event.target).attr('data-id');
        details(target)
        })


    //=======
    //==Ajax to get info to populate modal
    //=======

    const details = (target) => {
        $.ajax({
            url:('/dashboard/'+ target)
        }).then(
            (carcass) => {
                populate(carcass)
            },
            (error) => {
                // console.log(error);
            }
        )
    }
    //=======
    //==show and populate modal
    //=======
    const populate = (carcass) => {
        // console.log(carcass);
        $('#detailsModal').empty()
        $('#detailsModal').append(carcass)
        $('#detailsModal').modal('toggle')
    }

})
