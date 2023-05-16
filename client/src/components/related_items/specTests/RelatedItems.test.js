/** @jest-environment jsdom */
import {render, screen} from '@testing-library/react'
import RelatedItems from '../RelatedItems.jsx';
import '@testing-library/jest-dom'
import axios from 'axios';
import Jest from 'jest'


describe(RelatedItems, () => {
    it('Renders Related Items header properly', ()=>{
        const product ={
            "id": 40344,
            "campus": "hr-rfp",
            "name": "Camo Onesie",
            "slogan": "Blend in to your crowd",
            "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
            "category": "Jackets",
            "default_price": "140.00",
            "created_at": "2021-08-13T14:38:44.509Z",
            "updated_at": "2021-08-13T14:38:44.509Z",
            "features": [
                {
                    "feature": "Fabric",
                    "value": "Canvas"
                },
                {
                    "feature": "Buttons",
                    "value": "Brass"
                }
            ]
        };
        const related = [
            40345,
            40346,
            40351,
            40350
        ];
        const {getByText} = render(<RelatedItems currProduct={product} IDlist={related} handleRelatedItemClick={null} />);
        expect(getByText('Related Items')).toBeInTheDocument();
    });

    it('Renders OutFit list header properly', async ()=> {
        const resProd = await axios.get('http://localhost:3000/api/products/40344/') ;
        const relatedProd = await axios.get('http://localhost:3000/api/products/40344/related')
        // console.error(res.data)
        // const {getByText} = render(<RelatedItems currProduct={product} IDlist={related} handleRelatedItemClick={null} />);
        const {getByText}= render(<RelatedItems currProduct={resProd.data} IDlist={relatedProd.data} handleRelatedItemClick={null} />);
        expect(getByText('Outfit List')).toBeInTheDocument();
    });

    it('Check if images render properly for Outfit List', async ()=>{
        const resProd = await axios.get('http://localhost:3000/api/products/40344/') ;
        const relatedProd = await axios.get('http://localhost:3000/api/products/40344/related');
        render(<RelatedItems currProduct={resProd.data} IDlist={relatedProd.data} handleRelatedItemClick={null} />);
        // const image = document.querySelector('img');
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute(src, 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80')
    });

});