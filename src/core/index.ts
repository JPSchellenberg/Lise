export default class Core {
	constructor(renderfunction: (modules: Object) => void) {
		this.renderfunction = renderfunction;
		this.modules = {};

		this.renderfunction( this.modules );
	}

	renderfunction: (modules: Object) => void;
	modules: Object;

	public boot( module: any ) {
		const moduleName = module.getName();
		this.modules[ moduleName ] = 'default';
		module.boot( (status: string) => { this.setStatus(moduleName, status) });

		this.renderfunction( this.modules );
	}

	setStatus(moduleName: string, status: string) {
		this.modules[ moduleName ] = status; 

		this.renderfunction( this.modules );
	}

	public finish(finishfunction: () => any) {

		for (let index in this.modules) {
			if (this.modules[index] === 'danger') { return; }
		}

		setTimeout(finishfunction, 2500);
	}
}