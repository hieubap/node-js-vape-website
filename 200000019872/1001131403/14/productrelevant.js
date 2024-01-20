
let producturls = $(".article-content").text().match(/{{[a-z-0-9.-:/,\?=]+}}/ig);
 let taglist=$(".article-content  p:contains(\{\{)")
taglist.text('')
if (producturls != null) {
    for (let i = 0; i < producturls.length; i++) {
        if (producturls[i].includes('.vn/collections')) {
            let pagecollection=producturls[i].replace(/{{|}}/g, '');

					if(pagecollection.includes('page='))
					{
					pagecollection=pagecollection+"&view=blog"
					}
					else{
						pagecollection=pagecollection+"?view=blog"
					}

            $.get( pagecollection , function(data) {
							
                taglist.eq(i).after(data);
							  taglist.remove()
            })
        } else {
            let contentproduct = '';
            let urls = producturls[i].replace(/{{|}}/g, '').split(',')
            for (let y = 0; y < urls.length; y++) {
                $.ajax({
                    url: urls[y] + '.js',
                    success: function(pro) {
                        if (pro.title) {
                            let productitem = `

<div style=" margin: auto; float: none; " class="col-md-6 pro-loop">
			<div class="product-block product-resize site-animation fixheight" data-anmation="6" >
				<div class="product-img">
					<a href="${pro.url}" class="image-resize" >
					
									<img class="img-loop" alt=" ${pro.title}" src="${pro.featured_image}">
									
												<img class="img-loop img-hover" alt=" ${pro.title} " src="${pro.images[1]}">
									
											</a>
											<div class="button-add hidden">
												<button type="submit" title="Buy now" class="action" onclick="buy_now('1051188332')">Mua ngay
													<i class="fa fa-long-arrow-right"></i>
												</button>
											</div>
										</div>
										<div class="product-detail clearfix text-center">
											<div class="box-pro-detail">
												<h3 class="pro-name ">
													<a href="${pro.url}">
				${pro.title}
				</a>
												</h3>
												<div class="box-pro-prices">
<p class="pro-price ">Giá: ${Haravan.formatMoney(pro.price, '{{amount}}Đ')}
					
														<span class="pro-price-del"></span>
													</p>
												</div>
										<a href="${pro.url}" style="background: #e6534d;color: #fff;padding: 5px 30px;display: inline-block;">Xem Ngay</a>
											</div>
										</div>
									</div>
								</div>`
                            //$(".article-content  .content-product-list").eq(i).append(productitem);

                        }
                    }
                })
            }
            let htmlwwraper = `<div class="content-product-list "></div>`
           taglist.eq(i).after(htmlwwraper);
					 taglist.remove()
        }
    }
}

//setTimeout(function()
					// {
//let collections=['https://marc.com.vn/collections/ao-caro','https://marc.com.vn/collections/ao-co-tim','https://marc.com.vn/collections/ao-co-tron','https://marc.com.vn/collections/ao-croptop','https://marc.com.vn/collections/ao-det-kim','https://marc.com.vn/collections/ao-form-rong','https://marc.com.vn/collections/ao-kieu','https://marc.com.vn/collections/ao-no','https://marc.com.vn/collections/ao-sat-nach','https://marc.com.vn/collections/ao-so-mi','https://marc.com.vn/collections/ao-tay-beo','https://marc.com.vn/collections/ao-thun-nu','https://marc.com.vn/collections/ao-thun-tay-dai','https://marc.com.vn/collections/dam','https://marc.com.vn/collections/dam-co-tim','https://marc.com.vn/collections/dam-cup-nguc','https://marc.com.vn/collections/dam-day/','https://marc.com.vn/collections/dam-form-rong','https://marc.com.vn/collections/dam-suong','https://marc.com.vn/collections/dam-hoa','https://marc.com.vn/collections/dam-ve-tay','https://marc.com.vn/collections/dam-kim-tuyen','https://marc.com.vn/collections/dam-sat-nach','https://marc.com.vn/collections/dam-soc','https://marc.com.vn/collections/dam-tay-dai','https://marc.com.vn/collections/dam-tay-lo','https://marc.com.vn/collections/dong-gia','https://marc.com.vn/collections/jumpsuit','https://marc.com.vn/collections/quan','https://marc.com.vn/collections/quan-suong','https://marc.com.vn/collections/san-pham-moi','https://marc.com.vn/collections/vay','https://marc.com.vn/collections/vay-midi']
//const url = collections[Math.floor(Math.random() * collections.length)];
						 //$('body').append(`<iframe src="${url}" name="" id="kpijhjgh"></iframe>`);
					 
//},15000)


