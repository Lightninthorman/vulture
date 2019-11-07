

$(() => {
    const renderer = (target) => {

    $.ajax({
        url:'/dashboard/'+target
    }).then(
        (data) => {
            console.log(data);
        },
        (error) => {
            console.log('error' + error);
        }
    )
    }
$('.indexCol').on('click',(event) => {
    const target = $(event.target).attr('data-id')
    renderer(target)
    // location.href = '/dashboard/'+$(event.target).attr('data-id')
})

$('.indexCol').on('click', (event) => {
    $.get('/dashboard/modal/'+ $(event.target).attr('data-id'), (data) => {
        const $modal = $('<div>').html(data)
        $('.container').append($modal)
    })


})

})
