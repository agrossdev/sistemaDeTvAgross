console.log('in worker');
this.onmessage = e => {
    console.log('worker received message', e.data);
    this.postMessage('teste2')
}