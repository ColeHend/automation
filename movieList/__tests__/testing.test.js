const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async ()=>{
    await (await driver).get('http://127.0.0.1:5501/movieList/index.html')
})

afterAll(async ()=>{
    await driver.quit()
})
it('should add a movie',async()=>{
    const inputField = await driver.findElement(By.xpath('//input'))
    await inputField.sendKeys('Aladin')
    await driver.sleep(1000)
    await driver.findElement(By.css('button')).click()
})

it('should cross off movie',async ()=>{
    const span = await driver.findElement(By.css('span'))
    await span.click()
    const checked = await driver.findElement(By.css('.checked'))
    await driver.sleep(1000)
    expect(checked).toBeTruthy()
    await span.click()
})
it('should give crossoff notification',async ()=>{
    await driver.sleep(1500)

    const span = await driver.findElement(By.css('span'))
    const message = await driver.findElement(By.css('#message'))
    await span.click()
    const text = await message.getText()
    expect(text).toContain('Aladin watched!')
})
it('should delete a movie',async ()=>{
    const button = await driver.findElement(By.xpath('//button[contains(text(),"x")]')).click()
    await driver.sleep(1500)
    expect(button).toBeFalsy()

})