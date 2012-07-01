describe("EstadaoSemRefresh", function() {

  describe("pararRefresh", function(){
    it("faz o procedimento necessario para interromper o refresh", function() {
      var oReload;
      oReload = jasmine.createSpyObj('oReload', ['stop']);
      window.oReload = oReload;
      EstadaoSemRefresh.pararRefresh();
      expect(oReload.stop).toHaveBeenCalled();
      oReload.stop.reset();

      // nao executa oReload.stop se a pagina do estadao nao tiver o objeto de reload
      delete window.oReload
      EstadaoSemRefresh.pararRefresh();
      expect(oReload.stop).not.toHaveBeenCalled();
    });
  });

  describe("executar", function(){
    it("injeta codigo que chama parar refresh na pagina", function(){
      spyOn(EstadaoSemRefresh, 'injetarCodigo');
      EstadaoSemRefresh.executar();
      expect(EstadaoSemRefresh.injetarCodigo).toHaveBeenCalled();
    });
  });

  describe("injetaCodigo", function(){
    it("adiciona o codigo que quero executar na pagina permitindo acesso as variaveis ja existentes", function(){
      codigo = jasmine.createSpy('codigo');
      spyOn(codigo, 'toString').andReturn("console.log('chamada exemplo de console.log que gostaria de executar')");
      spyOn(document.body, 'appendChild');
      script = EstadaoSemRefresh.injetarCodigo(codigo);
      expect(document.body.appendChild).toHaveBeenCalledWith(script);
      expect(script.innerHTML).toEqual('$(' + codigo.toString() + ')();')
    });
  });
});
